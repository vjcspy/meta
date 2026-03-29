import { useQuery } from "@tanstack/react-query";

import { fetchAllCors } from "@/modules/shared/lib/jmeta/cor-api";

/**
 * Fetches all COR (industry classification) data.
 *
 * Baked-in staleTime of Infinity — cor data rarely changes.
 *
 * Query key: ["cors-all"]
 */
export function useCorsQuery() {
  return useQuery({
    queryKey: ["cors-all"],
    queryFn: fetchAllCors,
    staleTime: Infinity,
  });
}
