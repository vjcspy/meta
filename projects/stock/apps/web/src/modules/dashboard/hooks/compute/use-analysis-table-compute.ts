"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { useCorsQuery } from "@/modules/dashboard/hooks/queries/use-cors-query";
import { usePriceRangeQueries } from "@/modules/dashboard/hooks/queries/use-price-range-queries";
import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import type {
  AnalysisCacheEntry,
  AnalysisWorkerInput,
  AnalysisWorkerOutput,
} from "@/modules/dashboard/utils/analysis-types";
import { computeFetchFromDate } from "@/modules/dashboard/utils/compute-fetch-from-date";
import { useMarketCategories } from "@/modules/shared/hooks/use-market-categories";
import { useGlobalStore } from "@/modules/shared/store/global-store";

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

  const fetchFromDate = useMemo(() => computeFetchFromDate(fromDate, toDate), [fromDate, toDate]);

  const cacheKey = useMemo(
    () => ["analysis-table-computed", selectedCategoryKey, fromDate, toDate, tradeValueFilter],
    [selectedCategoryKey, fromDate, toDate, tradeValueFilter],
  );

  const priceQueries = usePriceRangeQueries(symbols, fetchFromDate, toDate, enabled);

  const { data: cors } = useCorsQuery();

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
      workerRef.current = new Worker(new URL("../../utils/analysis-table.worker.ts", import.meta.url));
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
