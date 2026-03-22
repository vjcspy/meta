import { useQuery } from "@tanstack/react-query";

import { fetchTickDaily } from "@/lib/jmeta/tick-api";
import { useDashboardStore } from "@/store/dashboard-store";

export function useTickDaily() {
  const symbol = useDashboardStore((s) => s.symbol);
  const fromDate = useDashboardStore((s) => s.fromDate);
  const toDate = useDashboardStore((s) => s.toDate);
  const isValid = useDashboardStore((s) => s.isDateRangeValid());

  return useQuery({
    queryKey: ["tick-daily", symbol, fromDate, toDate],
    queryFn: () => fetchTickDaily(symbol, fromDate, toDate),
    enabled: !!symbol && !!fromDate && !!toDate && isValid,
  });
}
