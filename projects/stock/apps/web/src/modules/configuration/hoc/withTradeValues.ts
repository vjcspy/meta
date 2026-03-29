import { createHOC } from "@web/ui-extension";

import { useTradeValues } from "@/modules/configuration/hooks/use-trade-values";

export const withTradeValues = createHOC(() => {
  const { tradeValueMap, isLoading: tradeValuesLoading } = useTradeValues();

  return {
    state: { tradeValueMap, tradeValuesLoading },
    actions: {},
  };
}, "withTradeValues");
