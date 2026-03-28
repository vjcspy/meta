"use client";

import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import type { MarketRangeCacheEntry, WorkerInput, WorkerOutput } from "@/modules/dashboard/utils/types";
import { useMarketCategories } from "@/modules/shared/components/use-market-categories";
import { fetchPriceRange } from "@/modules/shared/lib/jmeta/prices-api";
import { fetchTickDaily } from "@/modules/shared/lib/jmeta/tick-api";
import { useGlobalStore } from "@/modules/shared/store/global-store";

/**
 * Orchestrator hook — mounted in DashboardFilters (single instance).
 *
 * Responsibilities:
 * 1. Fetch tick data for all symbols in the selected category (parallel useQueries)
 * 2. Run Web Worker for SHEEP/SHARK computation
 * 3. Write results + status into TanStack Query cache for consumers
 * 4. Fetch VN-Index data for chart overlay
 *
 * Gated on widget visibility — zero background load when both market-range widgets are hidden.
 */
export function useMarketTickRangeCompute() {
  const queryClient = useQueryClient();
  const workerRef = useRef<Worker | null>(null);

  const selectedCategoryKey = useDashboardModuleStore((s) => s.selectedCategoryKey);
  const visibleWidgets = useDashboardModuleStore((s) => s.visibleWidgets);
  const fromDate = useGlobalStore((s) => s.fromDate);
  const toDate = useGlobalStore((s) => s.toDate);
  const tradeValueFilter = useGlobalStore((s) => s.tradeValueFilter);
  const isValid = useGlobalStore((s) => s.isDateRangeValid());

  const isGated = visibleWidgets["w-market-range-table"] !== false || visibleWidgets["w-market-range-chart"] !== false;

  const { data: categories } = useMarketCategories();
  const selectedCategory = categories?.find((c) => c.key === selectedCategoryKey);
  const symbols = selectedCategory?.symbols ?? [];

  const enabled = isGated && !!selectedCategoryKey && symbols.length > 0 && !!fromDate && !!toDate && isValid;

  const cacheKey = useMemo(
    () => ["market-range-computed", selectedCategoryKey, fromDate, toDate, tradeValueFilter],
    [selectedCategoryKey, fromDate, toDate, tradeValueFilter],
  );

  const tickQueries = useQueries({
    queries: symbols.map((symbol) => ({
      queryKey: ["tick-daily", symbol, fromDate, toDate],
      queryFn: () => fetchTickDaily(symbol, fromDate, toDate),
      enabled,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const allResolved = enabled && tickQueries.length > 0 && tickQueries.every((q) => q.isSuccess);
  const anyError = tickQueries.find((q) => q.isError);

  useQuery({
    queryKey: ["price-range", "VNINDEX", fromDate, toDate],
    queryFn: () => fetchPriceRange("VNINDEX", fromDate, toDate),
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  const writeCache = useCallback(
    (entry: MarketRangeCacheEntry) => {
      queryClient.setQueryData(cacheKey, entry);
    },

    [queryClient, cacheKey],
  );

  useEffect(() => {
    if (!enabled) return;
    if (!allResolved && !anyError) {
      writeCache({ symbolResults: [], status: "loading", error: null });
    }
    if (anyError) {
      writeCache({
        symbolResults: [],
        status: "error",
        error: anyError.error?.message ?? "Unknown error",
      });
    }
  }, [enabled, allResolved, anyError, writeCache]);

  useEffect(() => {
    if (isGated && !workerRef.current) {
      workerRef.current = new Worker(new URL("../../../utils/cal-tick-range-data.worker.ts", import.meta.url));
    } else if (!isGated && workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, [isGated]);

  useEffect(() => {
    if (!allResolved || !workerRef.current) return;

    const worker = workerRef.current;

    const symbolTicks = symbols.map((symbol, i) => ({
      symbol,
      ticks: tickQueries[i]!.data!,
    }));

    const input: WorkerInput = { symbolTicks, tradeValue: tradeValueFilter };

    worker.onmessage = (event: MessageEvent<WorkerOutput>) => {
      writeCache({
        symbolResults: event.data.results,
        status: "ready",
        error: null,
      });
    };

    worker.onerror = (err) => {
      writeCache({
        symbolResults: [],
        status: "error",
        error: err.message ?? "Worker computation failed",
      });
    };

    worker.postMessage(input);
  }, [allResolved, tradeValueFilter, symbols.join(",")]);
}
