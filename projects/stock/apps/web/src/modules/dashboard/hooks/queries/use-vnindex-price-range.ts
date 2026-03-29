import { useQuery } from "@tanstack/react-query";

import { fetchPriceRange } from "@/modules/shared/lib/jmeta/prices-api";

/**
 * Fetches VN-Index price range data.
 *
 * Baked-in staleTime of 5 minutes — same as the original market-range compute hook.
 *
 * @param fromDate - Start date (YYYY-MM-DD)
 * @param toDate - End date (YYYY-MM-DD)
 * @param enabled - Whether the query should execute
 *
 * Query key: ["price-range", "VNINDEX", fromDate, toDate]
 */
export function useVNIndexPriceRange(fromDate: string, toDate: string, enabled: boolean) {
  return useQuery({
    queryKey: ["price-range", "VNINDEX", fromDate, toDate],
    queryFn: () => fetchPriceRange("VNINDEX", fromDate, toDate),
    enabled,
    staleTime: 5 * 60 * 1000,
  });
}
