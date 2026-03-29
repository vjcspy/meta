import { useQueries } from "@tanstack/react-query";

import { fetchPriceRange } from "@/modules/shared/lib/jmeta/prices-api";

/**
 * Batch hook: fetches price-range data for multiple symbols in parallel via `useQueries`.
 *
 * Baked-in staleTime of 5 minutes — same as the original analysis table compute hook.
 *
 * @param symbols - Array of stock symbols to fetch
 * @param fetchFromDate - Start date (YYYY-MM-DD), typically computed via `computeFetchFromDate`
 * @param toDate - End date (YYYY-MM-DD)
 * @param enabled - Whether queries should execute
 *
 * Query key: ["price-range", symbol, fetchFromDate, toDate]
 */
export function usePriceRangeQueries(symbols: string[], fetchFromDate: string, toDate: string, enabled: boolean) {
  return useQueries({
    queries: symbols.map((symbol) => ({
      queryKey: ["price-range", symbol, fetchFromDate, toDate],
      queryFn: () => fetchPriceRange(symbol, fetchFromDate, toDate),
      enabled,
      staleTime: 5 * 60 * 1000,
    })),
  });
}
