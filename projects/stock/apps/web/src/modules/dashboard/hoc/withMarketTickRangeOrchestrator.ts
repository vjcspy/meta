import { createHOC } from "@web/ui-extension";

import { useMarketTickRangeCompute } from "@/modules/dashboard/components/widgets/market-range/use-market-tick-range-compute";

/**
 * ORCHESTRATOR HOC — mounted on ONE host only (DashboardFilters).
 * Manages parallel useQueries for category symbols, Worker lifecycle, and cache writes.
 */
export const withMarketTickRangeOrchestrator = createHOC(() => {
  useMarketTickRangeCompute();

  return {
    state: { orchestratorMounted: true },
    actions: {},
  };
}, "withMarketRangeOrchestrator");
