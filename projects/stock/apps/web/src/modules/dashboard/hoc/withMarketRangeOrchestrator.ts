import { createHOC } from "@web/ui-extension";

import { useMarketRangeCompute } from "@/modules/dashboard/components/widgets/market-range/use-market-range-compute";

/**
 * ORCHESTRATOR HOC — mounted on ONE host only (DashboardFilters).
 * Manages parallel useQueries for category symbols, Worker lifecycle, and cache writes.
 */
export const withMarketRangeOrchestrator = createHOC(() => {
  useMarketRangeCompute();

  return {
    state: { orchestratorMounted: true },
    actions: {},
  };
}, "withMarketRangeOrchestrator");
