import { useQuery } from "@tanstack/react-query";

import { fetchStocks } from "@/modules/shared/lib/jmeta/stock-api";

// --- Query Hook ---

const STOCKS_KEY = ["stocks"] as const;

export function useStocks() {
  return useQuery({
    queryKey: STOCKS_KEY,
    queryFn: fetchStocks,
    staleTime: 30 * 60 * 1000, // 30 min — stocks sync daily at 19:00 ICT
  });
}
