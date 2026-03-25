import { useQuery } from "@tanstack/react-query";
import { createHOC } from "@web/ui-extension";

import type { TickDailySummary } from "@/lib/jmeta/tick-api";
import { fetchTickDaily } from "@/lib/jmeta/tick-api";
import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import type {
  MarketRangeCacheEntry,
  SymbolRangeResult,
} from "@/modules/dashboard/utils/types";
import { useMarketCategories } from "@/modules/shared/components/use-market-categories";
import { useGlobalStore } from "@/modules/shared/store/global-store";

/**
 * READER HOC — mounted on each consumer widget (MarketRangeTable, MarketRangeChart).
 * Reads from TQ cache only — zero fetching, zero workers.
 */
export const withMarketRangeResults = createHOC(() => {
  const selectedCategoryKey = useDashboardModuleStore(
    (s) => s.selectedCategoryKey,
  );
  const fromDate = useGlobalStore((s) => s.fromDate);
  const toDate = useGlobalStore((s) => s.toDate);
  const tradeValueFilter = useGlobalStore((s) => s.tradeValueFilter);

  const { data: categories } = useMarketCategories();
  const selectedCategory = categories?.find(
    (c) => c.key === selectedCategoryKey,
  );
  const symbols = selectedCategory?.symbols ?? [];

  const { data: cacheEntry } = useQuery<MarketRangeCacheEntry>({
    queryKey: [
      "market-range-computed",
      selectedCategoryKey,
      fromDate,
      toDate,
      tradeValueFilter,
    ],
    queryFn: () => {
      throw new Error("consumer-only — orchestrator writes to this key");
    },
    enabled: false,
  });

  const { data: vnIndexData } = useQuery<TickDailySummary[]>({
    queryKey: ["tick-daily", "VNINDEX", fromDate, toDate],
    queryFn: () => fetchTickDaily("VNINDEX", fromDate, toDate),
    enabled: false,
  });

  const symbolResults: SymbolRangeResult[] = cacheEntry?.symbolResults ?? [];
  const isLoading = cacheEntry?.status === "loading";
  const error = cacheEntry?.error ?? null;

  return {
    state: {
      symbolResults,
      vnIndexData: vnIndexData ?? [],
      symbols,
      isLoading,
      error,
    },
    actions: {},
  };
}, "withMarketRangeResults");
