import { createHOC } from "@web/ui-extension";

import { useMarketCategories } from "@/modules/shared/hooks/use-market-categories";

export const withMarketCategories = createHOC(() => {
  const { data: categories, isLoading: categoriesLoading, refetch: refetchCategories } = useMarketCategories();

  return {
    state: { categories: categories ?? [], categoriesLoading },
    actions: { refetchCategories },
  };
}, "withMarketCategories");
