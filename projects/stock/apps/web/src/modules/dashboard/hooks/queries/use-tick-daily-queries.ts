import { useQueries } from "@tanstack/react-query";

import { fetchTickDaily } from "@/modules/shared/lib/jmeta/tick-api";

/**
 * Batch hook: fetches tick-daily data for multiple symbols in parallel via `useQueries`.
 *
 * @param symbols - Array of stock symbols to fetch
 * @param fromDate - Start date (YYYY-MM-DD)
 * @param toDate - End date (YYYY-MM-DD)
 * @param enabled - Whether queries should execute
 * @param options - Optional overrides (e.g. staleTime)
 *
 * Query key: ["tick-daily", symbol, fromDate, toDate]
 */
export function useTickDailyQueries(
  symbols: string[],
  fromDate: string,
  toDate: string,
  enabled: boolean,
  options?: { staleTime?: number },
) {
  return useQueries({
    queries: symbols.map((symbol) => ({
      queryKey: ["tick-daily", symbol, fromDate, toDate],
      queryFn: () => fetchTickDaily(symbol, fromDate, toDate),
      enabled,
      staleTime: options?.staleTime,
    })),
  });
}
