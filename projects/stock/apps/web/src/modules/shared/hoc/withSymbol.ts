import { createHOC } from "@web/ui-extension";

import { useGlobalStore } from "@/modules/shared/store/global-store";

export const withSymbol = createHOC(() => {
  const symbol = useGlobalStore((s) => s.symbol);
  const setSymbol = useGlobalStore((s) => s.setSymbol);

  return {
    state: { symbol },
    actions: { setSymbol },
  };
}, "withSymbol");
