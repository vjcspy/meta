"use client";

import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import type { AnalysisCacheEntry, AnalysisWorkerInput, AnalysisWorkerOutput } from "@/modules/dashboard/utils/analysis-types";
import { useMarketCategories } from "@/modules/shared/components/use-market-categories";
import { fetchAllCors } from "@/modules/shared/lib/jmeta/cor-api";
import { fetchPriceRange } from "@/modules/shared/lib/jmeta/prices-api";
import { useGlobalStore } from "@/modules/shared/store/global-store";

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function computeFetchFromDate(fromDate: string, toDate: string): string {
  const toDateObj = new Date(toDate + "T00:00:00");
  const minFetch = new Date(toDateObj);
  minFetch.setDate(minFetch.getDate() - 60);
  const minFetchStr = formatDate(minFetch);
  return fromDate < minFetchStr ? fromDate : minFetchStr;
}

/**
 * Orchestrator hook — mounted in DashboardFilters (single instance).
 *
 * Responsibilities:
 * 1. Fetch price data for all symbols in the selected category (parallel useQueries)
 * 2. Fetch all cor (industry classification) data once globally
 * 3. Run Web Worker for trade_value + foreign buy/sell aggregation
 * 4. Write results + status into TanStack Query cache for consumers
 *
 * Gated on widget visibility — zero background load when analysis table is hidden.
 */
export function useAnalysisTableCompute() {
  const queryClient = useQueryClient();
  const workerRef = useRef<Worker | null>(null);

  const selectedCategoryKey = useDashboardModuleStore((s) => s.selectedCategoryKey);
  const visibleWidgets = useDashboardModuleStore((s) => s.visibleWidgets);
  const fromDate = useGlobalStore((s) => s.fromDate);
  const toDate = useGlobalStore((s) => s.toDate);
  const tradeValueFilter = useGlobalStore((s) => s.tradeValueFilter);
  const isValid = useGlobalStore((s) => s.isDateRangeValid());

  const isGated = visibleWidgets["w-analysis-table"] !== false;

  const { data: categories } = useMarketCategories();
  const selectedCategory = categories?.find((c) => c.key === selectedCategoryKey);
  const symbols = selectedCategory?.symbols ?? [];

  const enabled = isGated && !!selectedCategoryKey && symbols.length > 0 && !!fromDate && !!toDate && isValid;

  const fetchFromDate = useMemo(
    () => computeFetchFromDate(fromDate, toDate),
    [fromDate, toDate],
  );

  const cacheKey = useMemo(
    () => ["analysis-table-computed", selectedCategoryKey, fromDate, toDate, tradeValueFilter],
    [selectedCategoryKey, fromDate, toDate, tradeValueFilter],
  );

  const priceQueries = useQueries({
    queries: symbols.map((symbol) => ({
      queryKey: ["price-range", symbol, fetchFromDate, toDate],
      queryFn: () => fetchPriceRange(symbol, fetchFromDate, toDate),
      enabled,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const { data: cors } = useQuery({
    queryKey: ["cors-all"],
    queryFn: fetchAllCors,
    staleTime: Infinity,
  });

  const allPricesResolved = enabled && priceQueries.length > 0 && priceQueries.every((q) => q.isSuccess);
  const corResolved = !!cors;
  const allResolved = allPricesResolved && corResolved;
  const anyError = priceQueries.find((q) => q.isError);

  const writeCache = useCallback(
    (entry: AnalysisCacheEntry) => {
      queryClient.setQueryData(cacheKey, entry);
    },
    [queryClient, cacheKey],
  );

  useEffect(() => {
    if (!enabled) return;
    if (!allResolved && !anyError) {
      writeCache({ rows: [], status: "loading", error: null });
    }
    if (anyError) {
      writeCache({
        rows: [],
        status: "error",
        error: anyError.error?.message ?? "Unknown error",
      });
    }
  }, [enabled, allResolved, anyError, writeCache]);

  useEffect(() => {
    if (isGated && !workerRef.current) {
      workerRef.current = new Worker(new URL("../../../utils/analysis-table.worker.ts", import.meta.url));
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

    const symbolPrices = symbols.map((symbol, i) => ({
      symbol,
      prices: priceQueries[i]!.data!,
    }));

    const input: AnalysisWorkerInput = {
      symbolPrices,
      cors: cors!,
      fromDate,
      toDate,
      tradeValueFilter,
    };

    worker.onmessage = (event: MessageEvent<AnalysisWorkerOutput>) => {
      writeCache({ rows: event.data.rows, status: "ready", error: null });
    };

    worker.onerror = (err) => {
      writeCache({
        rows: [],
        status: "error",
        error: err.message ?? "Worker computation failed",
      });
    };

    worker.postMessage(input);
  }, [allResolved, tradeValueFilter, symbols.join(","), fromDate, toDate]);
}
