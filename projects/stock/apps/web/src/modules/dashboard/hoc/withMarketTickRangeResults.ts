import { useQuery } from "@tanstack/react-query";
import { createHOC } from "@web/ui-extension";

import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import type { MarketRangeCacheEntry, SymbolRangeResult } from "@/modules/dashboard/utils/types";
import { useMarketCategories } from "@/modules/shared/hooks/use-market-categories";
import type { PriceDaily } from "@/modules/shared/lib/jmeta/prices-api";
import { useGlobalStore } from "@/modules/shared/store/global-store";

/**
 * READER HOC — mounted on each consumer widget (MarketRangeTable, MarketRangeChart).
 * Reads from TQ cache only — zero fetching, zero workers.
 */
export const withMarketTickRangeResults = createHOC(() => {
  const selectedCategoryKey = useDashboardModuleStore((s) => s.selectedCategoryKey);
  const fromDate = useGlobalStore((s) => s.fromDate);
  const toDate = useGlobalStore((s) => s.toDate);
  const tradeValueFilter = useGlobalStore((s) => s.tradeValueFilter);

  const { data: categories } = useMarketCategories();
  const selectedCategory = categories?.find((c) => c.key === selectedCategoryKey);
  const symbols = selectedCategory?.symbols ?? [];

  const { data: cacheEntry } = useQuery<MarketRangeCacheEntry>({
    queryKey: ["market-range-computed", selectedCategoryKey, fromDate, toDate, tradeValueFilter],
    queryFn: () => {
      throw new Error("consumer-only — orchestrator writes to this key");
    },
    enabled: false,
  });

  const { data: vnIndexData } = useQuery<PriceDaily[]>({
    queryKey: ["price-range", "VNINDEX", fromDate, toDate],
    queryFn: () => {
      throw new Error("consumer-only");
    },
    enabled: false,
  });

  const symbolResults: SymbolRangeResult[] = cacheEntry?.symbolResults ?? [];
  const isLoading = cacheEntry?.status === "loading";
  const error = cacheEntry?.error ?? null;

  return {
    state: {
      symbolResults,
      symbols,
      vnIndexData: vnIndexData ?? [],
      isLoading,
      error,
    },
    actions: {},
  };
}, "withMarketRangeResults");
