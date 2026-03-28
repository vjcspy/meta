import { createHOC } from "@web/ui-extension";

import { useGlobalStore } from "@/modules/shared/store/global-store";

export const withTradeValueFilter = createHOC(() => {
  const tradeValueFilter = useGlobalStore((s) => s.tradeValueFilter);
  const setTradeValueFilter = useGlobalStore((s) => s.setTradeValueFilter);

  return {
    state: { tradeValueFilter },
    actions: { setTradeValueFilter },
  };
}, "withTradeValueFilter");
