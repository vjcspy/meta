import { useQuery } from "@tanstack/react-query";

import { fetchTickDaily } from "@/modules/shared/lib/jmeta/tick-api";

/**
 * Single-symbol wrapper: fetches tick-daily data for one symbol via `useQuery`.
 *
 * Uses the same query key pattern as `useTickDailyQueries` so both share TanStack Query cache.
 * No staleTime — matches current `withTickData` behavior (default 0).
 *
 * @param symbol - Stock symbol to fetch
 * @param fromDate - Start date (YYYY-MM-DD)
 * @param toDate - End date (YYYY-MM-DD)
 * @param enabled - Whether the query should execute
 *
 * Query key: ["tick-daily", symbol, fromDate, toDate]
 */
export function useTickDailyQuery(symbol: string, fromDate: string, toDate: string, enabled: boolean) {
  return useQuery({
    queryKey: ["tick-daily", symbol, fromDate, toDate],
    queryFn: () => fetchTickDaily(symbol, fromDate, toDate),
    enabled,
  });
}
