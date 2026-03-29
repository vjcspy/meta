import { createHOC } from "@web/ui-extension";

import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import { useMarketCategories } from "@/modules/shared/hooks/use-market-categories";

export const withCategorySelector = createHOC(() => {
  const { data: categories, isLoading: categoriesLoading } = useMarketCategories();
  const selectedCategoryKey = useDashboardModuleStore((s) => s.selectedCategoryKey);
  const setSelectedCategoryKey = useDashboardModuleStore((s) => s.setSelectedCategoryKey);

  const selectedCategory = categories?.find((c) => c.key === selectedCategoryKey) ?? null;

  return {
    state: { categories: categories ?? [], categoriesLoading, selectedCategoryKey, selectedCategory },
    actions: { setSelectedCategoryKey },
  };
}, "withCategorySelector");
