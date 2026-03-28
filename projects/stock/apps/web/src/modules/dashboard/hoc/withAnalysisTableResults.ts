import { useQuery } from "@tanstack/react-query";
import { createHOC } from "@web/ui-extension";

import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import type { AnalysisCacheEntry, AnalysisRow } from "@/modules/dashboard/utils/analysis-types";
import { useGlobalStore } from "@/modules/shared/store/global-store";

/**
 * READER HOC — mounted on each consumer widget (AnalysisSymbolTable).
 * Reads from TQ cache only — zero fetching, zero workers.
 */
export const withAnalysisTableResults = createHOC(() => {
  const selectedCategoryKey = useDashboardModuleStore((s) => s.selectedCategoryKey);
  const fromDate = useGlobalStore((s) => s.fromDate);
  const toDate = useGlobalStore((s) => s.toDate);
  const tradeValueFilter = useGlobalStore((s) => s.tradeValueFilter);

  const { data: cacheEntry } = useQuery<AnalysisCacheEntry>({
    queryKey: ["analysis-table-computed", selectedCategoryKey, fromDate, toDate, tradeValueFilter],
    queryFn: () => {
      throw new Error("consumer-only — orchestrator writes to this key");
    },
    enabled: false,
  });

  const analysisRows: AnalysisRow[] = cacheEntry?.rows ?? [];
  const isLoading = cacheEntry?.status === "loading";
  const error = cacheEntry?.error ?? null;

  return {
    state: { analysisRows, isLoading, error },
    actions: {},
  };
}, "withAnalysisTableResults");
