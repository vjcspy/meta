import { createHOC } from "@web/ui-extension";

import { useStocks } from "@/modules/shared/components/use-stocks";

export const withStocks = createHOC(() => {
  const { data: stocks, isLoading: stocksLoading, refetch: refetchStocks } = useStocks();

  return {
    state: { stocks: stocks ?? [], stocksLoading },
    actions: { refetchStocks },
  };
}, "withStocks");
