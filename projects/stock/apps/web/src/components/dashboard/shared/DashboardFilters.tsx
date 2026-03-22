"use client";

import { debounce } from "es-toolkit";
import React, { useCallback, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDashboardStore } from "@/store/dashboard-store";

import DashboardWidget from "./DashboardWidget";

const WIDGET_OPTIONS = [
  { id: "w-tick-chart", label: "Tick At-Price Chart" },
  { id: "w-tick-summary", label: "Tick Summary" },
] as const;

function parseDate(dateStr: string): Date | undefined {
  const d = new Date(dateStr + "T00:00:00");
  return isNaN(d.getTime()) ? undefined : d;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export default function DashboardFilters() {
  const symbol = useDashboardStore((s) => s.symbol);
  const fromDate = useDashboardStore((s) => s.fromDate);
  const toDate = useDashboardStore((s) => s.toDate);
  const tradeValueFilter = useDashboardStore((s) => s.tradeValueFilter);
  const visibleWidgets = useDashboardStore((s) => s.visibleWidgets);
  const setSymbol = useDashboardStore((s) => s.setSymbol);
  const setFromDate = useDashboardStore((s) => s.setFromDate);
  const setToDate = useDashboardStore((s) => s.setToDate);
  const setTradeValueFilter = useDashboardStore((s) => s.setTradeValueFilter);
  const toggleWidget = useDashboardStore((s) => s.toggleWidget);
  const isDateRangeValid = useDashboardStore((s) => s.isDateRangeValid());

  // Local symbol input with debounced store update
  const [localSymbol, setLocalSymbol] = useState(symbol);

  const debouncedSetSymbol = useMemo(
    () => debounce((v: string) => setSymbol(v), 500),
    [setSymbol],
  );

  const handleSymbolChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value.toUpperCase();
      setLocalSymbol(v);
      debouncedSetSymbol(v);
    },
    [debouncedSetSymbol],
  );

  // Date validation warnings
  const rangeWarning = !isDateRangeValid
    ? fromDate > toDate
      ? "From date must be before To date"
      : "Date range must be ≤ 90 days"
    : null;

  const widgetToggleMenu = (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          Widgets
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Toggle Widgets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {WIDGET_OPTIONS.map((w) => (
          <DropdownMenuCheckboxItem
            key={w.id}
            checked={visibleWidgets[w.id] !== false}
            onCheckedChange={() => toggleWidget(w.id)}
          >
            {w.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <DashboardWidget
      widgetId="w-filters"
      title="Dashboard Filters"
      canClose={false}
      canMove={false}
      canResize={false}
      headerAction={widgetToggleMenu}
    >
      <div className="flex flex-wrap items-center gap-4 p-4">
        {/* Symbol */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Symbol</span>
          <input
            aria-label="Symbol"
            placeholder="Symbol"
            className="no-drag h-8 w-28 rounded-md border bg-background px-2 text-sm"
            value={localSymbol}
            onChange={handleSymbolChange}
          />
        </div>

        {/* From Date */}
        <DatePicker
          label="From"
          date={parseDate(fromDate)}
          onChange={(d) => d && setFromDate(formatDate(d))}
        />

        {/* To Date */}
        <DatePicker
          label="To"
          date={parseDate(toDate)}
          onChange={(d) => d && setToDate(formatDate(d))}
        />

        {/* Trade Value Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Filter (M)</span>
          <input
            aria-label="Trade value filter"
            type="number"
            className="no-drag h-8 w-24 rounded-md border bg-background px-2 text-sm"
            value={tradeValueFilter}
            onChange={(e) => setTradeValueFilter(Number(e.target.value) || 0)}
          />
        </div>

        {/* Validation warning */}
        {rangeWarning && (
          <span className="text-xs text-destructive">{rangeWarning}</span>
        )}
      </div>
    </DashboardWidget>
  );
}
