import { createHOC } from "@web/ui-extension";

import { useAnalysisTableCompute } from "@/modules/dashboard/hooks/compute/use-analysis-table-compute";

/**
 * ORCHESTRATOR HOC — mounted on ONE host only (DashboardFilters).
 * Manages parallel useQueries for category symbols, Worker lifecycle, and cache writes.
 */
export const withAnalysisTableOrchestrator = createHOC(() => {
  useAnalysisTableCompute();

  return {
    state: { orchestratorMounted: true },
    actions: {},
  };
}, "withAnalysisTableOrchestrator");
