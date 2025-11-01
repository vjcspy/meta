"use client";

import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import { debounce } from "es-toolkit";
import {format, parseISO} from "date-fns";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DatePicker from "@/components/ui/date-picker";
import {getSupabaseClient} from "@/lib/supabase/client";
import CandleFeatureLineChart from "@/components/chart/CandleFeatureLineChart";
import {getUserConfigKey, putUserConfig} from "@/lib/user-config";
import {formatHHMM} from "@/lib/datetime";

type WhaleFootprint = Record<string, number>;

type CandleRow = {
    id: number;
    symbol: string;
    time: number; // epoch sec
    interval: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
    value?: number;
    features?: { whale_footprint?: WhaleFootprint };
    date: string; // YYYY-MM-DD
};
let userConfigKey = "dashboard.stockCandleFeatureChart";
export default function StockCandleFeatureChart() {
    const supabase = getSupabaseClient();

    const [symbol, setSymbol] = useState<string>("CEO");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [rows, setRows] = useState<CandleRow[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [availableKeys, setAvailableKeys] = useState<string[]>([]);
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [loadUserConfig, setLoadUserConfig] = useState<boolean>(false);

    const doRefresh = useCallback(async () => {
        setLoading(true);
        setError(undefined);
        try {
            let query = supabase
                .from("stock_trading_feature_candles")
                .select(
                    "id,symbol,time,interval,open,high,low,close,volume,value,features,date",
                )
                .eq("symbol", symbol.trim())
                .order("time", {ascending: true});
            const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined;
            if (dateStr) {
                query = query.eq("date", dateStr);
            }

            const {data, error} = await query;
            if (error) throw error;
            const list = (data ?? []) as CandleRow[];
            setRows(list);

            // discover keys from first row
            const keys = Object.keys(list[0]?.features?.whale_footprint ?? {});
            setAvailableKeys(keys);
            // init selected keys if empty -> none by default
        } catch (e: any) {
            setError(e?.message ?? "Failed to fetch data");
        } finally {
            setLoading(false);
        }
    }, [supabase, symbol, selectedDate]);

    const refresh = useMemo(() => debounce(() => {
        void doRefresh();
    }, 500), [doRefresh]);

    useEffect(() => {
        const cfg = getUserConfigKey<{
            symbol?: string;
            date?: string; // YYYY-MM-DD
            features?: string[];
        }>(userConfigKey);

        if (cfg?.symbol) {
            setSymbol(cfg.symbol);
        }
        if (cfg?.date) {
            try {
                const d = parseISO(cfg.date);
                if (!isNaN(d.getTime())) setSelectedDate(d);
            } catch {
            }
        }
        if (cfg?.features && Array.isArray(cfg.features)) {
            setSelectedKeys(cfg.features);
        }
        setLoadUserConfig(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        refresh();
    }, [symbol, selectedDate, selectedKeys]);

    useEffect(() => {
        const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined;
        if (loadUserConfig && symbol && dateStr) {
            putUserConfig(userConfigKey, {symbol, date: dateStr, features: selectedKeys});
        }
    }, [loadUserConfig, symbol, selectedDate, selectedKeys]);

    const labels = useMemo(() => rows.map((r) => formatHHMM(r.time)), [rows]);

    const series = useMemo(() => {
        const base = [
            {
                id: "close",
                label: "Close",
                data: rows.map((r) => r.close ?? null),
            },
        ];

        const features = selectedKeys.map((key) => ({
            id: key,
            label: key,
            data: rows.map((r) => r.features?.whale_footprint?.[key] ?? null),
        }));
        return [...base, ...features];
    }, [rows, selectedKeys]);

    const toggleKey = (key: string, checked: boolean | "indeterminate") => {
        const isOn = checked === true;
        setSelectedKeys((prev) => {
            const set = new Set(prev);
            if (isOn) set.add(key);
            else set.delete(key);
            return Array.from(set);
        });
    };

    return (
        <Card className="flex h-full w-full flex-col overflow-hidden">
            <CardHeader className="grid grid-cols-[1fr_auto] items-center gap-2 border-b px-4 py-3">
                <CardTitle className="rgl-drag-handle cursor-move select-none text-base">
                    Stock Candle Feature
                </CardTitle>
                <CardAction className="no-drag flex items-center gap-2">
                    {/* Symbol input */}
                    <input
                        aria-label="Symbol"
                        placeholder="Symbol"
                        className="no-drag h-8 w-28 rounded-md border bg-background px-2 text-sm"
                        value={symbol}
                        onChange={(e) => setSymbol(e.target.value)}
                    />

                    {/* Single intraday date picker (shadcn) */}
                    <DatePicker
                        label="Date"
                        date={selectedDate}
                        onChange={(d) => setSelectedDate(d)}
                    />

                    {/* Feature keys multi-select */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="outline" className="no-drag">
                                Features
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-64">
                            <DropdownMenuLabel>Select features</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {availableKeys.length === 0 ? (
                                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                                    No features available
                                </div>
                            ) : (
                                availableKeys.map((key) => (
                                    <DropdownMenuCheckboxItem
                                        key={key}
                                        checked={selectedKeys.includes(key)}
                                        onCheckedChange={(v) => toggleKey(key, v)}
                                    >
                                        {key}
                                    </DropdownMenuCheckboxItem>
                                ))
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button size="sm" onClick={doRefresh}>
                        Refresh
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                {error ? (
                    <div className="flex h-full items-center justify-center px-4 text-sm text-destructive">
                        {error}
                    </div>
                ) : (
                    <CandleFeatureLineChart labels={labels} series={series}/>
                )}
                {loading ? (
                    <div
                        className="pointer-events-none absolute right-3 top-3 rounded-md bg-background/70 px-2 py-1 text-xs text-muted-foreground">
                        Loading...
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}