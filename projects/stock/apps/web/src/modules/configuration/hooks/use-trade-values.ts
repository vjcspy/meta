"use client";

import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";

import { fetchPricesByDate, type PriceDailyWithSymbol } from "@/modules/shared/lib/jmeta/prices-api";

// --- Types ---

export type TradeValueMap = Map<string, { trade_value_7: number; trade_value_15: number; trade_value_30: number }>;

// --- Helpers ---

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Generate an array of calendar dates from (today - daysBack) to today.
 * We use ~45 calendar days to ensure we cover at least 30 trading days (weekdays, excluding holidays).
 */
function generateDateStrings(daysBack: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i <= daysBack; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(formatDate(d));
  }
  return dates; // newest first
}

/**
 * Given all fetched price rows grouped by date, compute trade_value_7/15/30 per symbol.
 * "trade_value_N" = sum of `value` for the last N trading sessions, divided by 1000 (tỷ VND).
 */
function computeTradeValues(allPrices: PriceDailyWithSymbol[][]): TradeValueMap {
  // 1. Collect unique trading dates in descending order
  const tradingDateSet = new Set<string>();
  for (const dayPrices of allPrices) {
    for (const p of dayPrices) {
      tradingDateSet.add(p.date);
    }
  }
  const tradingDates = [...tradingDateSet].sort((a, b) => b.localeCompare(a)); // descending

  const last7Dates = new Set(tradingDates.slice(0, 7));
  const last15Dates = new Set(tradingDates.slice(0, 15));
  const last30Dates = new Set(tradingDates.slice(0, 30));

  // 2. Accumulate per symbol
  const accum = new Map<string, { v7: number; v15: number; v30: number }>();

  for (const dayPrices of allPrices) {
    for (const p of dayPrices) {
      let entry = accum.get(p.symbol);
      if (!entry) {
        entry = { v7: 0, v15: 0, v30: 0 };
        accum.set(p.symbol, entry);
      }
      if (last30Dates.has(p.date)) {
        entry.v30 += p.value;
      }
      if (last15Dates.has(p.date)) {
        entry.v15 += p.value;
      }
      if (last7Dates.has(p.date)) {
        entry.v7 += p.value;
      }
    }
  }

  // 3. Convert to tỷ VND (/ 1000)
  const result: TradeValueMap = new Map();
  for (const [symbol, v] of accum) {
    result.set(symbol, {
      trade_value_7: Math.round(v.v7 / 1000),
      trade_value_15: Math.round(v.v15 / 1000),
      trade_value_30: Math.round(v.v30 / 1000),
    });
  }

  return result;
}

// --- Hook ---

const DAYS_BACK = 45; // 45 calendar days covers ~30 trading days

/**
 * Fetches all stock prices for the last 45 calendar days (one API call per date)
 * and computes trade_value_7/15/30 per symbol from the current date.
 */
export function useTradeValues() {
  const dateStrings = useMemo(() => generateDateStrings(DAYS_BACK), []);

  const queries = useQueries({
    queries: dateStrings.map((date) => ({
      queryKey: ["prices-by-date", date] as const,
      queryFn: () => fetchPricesByDate(date),
      staleTime: 10 * 60 * 1000, // 10 min
      gcTime: 30 * 60 * 1000, // keep in cache 30 min
    })),
  });

  const allResolved = queries.every((q) => q.isSuccess);
  const isLoading = queries.some((q) => q.isLoading);

  const queriesKey = queries.map((q) => q.dataUpdatedAt).join(",");

  // eslint-disable-next-line react-hooks/preserve-manual-memoization
  const tradeValueMap = useMemo(() => {
    if (!allResolved) return new Map() as TradeValueMap;
    return computeTradeValues(queries.map((q) => q.data!));
  }, [allResolved, queriesKey]);

  return { tradeValueMap, isLoading: isLoading && !allResolved };
}
