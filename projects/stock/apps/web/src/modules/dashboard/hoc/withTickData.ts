import { useQuery } from "@tanstack/react-query";
import { createHOC } from "@web/ui-extension";
import { useMemo } from "react";

import { fetchTickDaily } from "@/lib/jmeta/tick-api";
import { calcTickSummary } from "@/modules/dashboard/utils/calc-tick-summary";
import { classifyTicks } from "@/modules/dashboard/utils/classify-ticks";
import { useGlobalStore } from "@/modules/shared/store/global-store";

export const withTickData = createHOC(() => {
  const symbol = useGlobalStore((s) => s.symbol);
  const fromDate = useGlobalStore((s) => s.fromDate);
  const toDate = useGlobalStore((s) => s.toDate);
  const tradeValueFilter = useGlobalStore((s) => s.tradeValueFilter);
  const isValid = useGlobalStore((s) => s.isDateRangeValid());

  const {
    data: ticks,
    isLoading: ticksLoading,
    error: ticksError,
    refetch: refetchTicks,
  } = useQuery({
    queryKey: ["tick-daily", symbol, fromDate, toDate],
    queryFn: () => fetchTickDaily(symbol, fromDate, toDate),
    enabled: !!symbol && !!fromDate && !!toDate && isValid,
  });

  const classifiedTicks = useMemo(() => {
    if (!ticks) return undefined;
    return classifyTicks(ticks, tradeValueFilter);
  }, [ticks, tradeValueFilter]);

  const tickSummary = useMemo(() => {
    if (!classifiedTicks) return null;
    return calcTickSummary(classifiedTicks);
  }, [classifiedTicks]);

  return {
    state: {
      ticks: ticks ?? [],
      classifiedTicks,
      tickSummary,
      ticksLoading,
      ticksError: ticksError ?? null,
    },
    actions: { refetchTicks },
  };
}, "withTickData");
