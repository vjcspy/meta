import { createHOC } from "@web/ui-extension";

import { useCategorySymbols } from "@/modules/configuration/hooks/use-category-symbols";

export const withCategorySymbols = createHOC((props: { state?: { selectedCategoryKey?: string | null } }) => {
  const selectedCategoryKey = props.state?.selectedCategoryKey ?? null;

  const { isSymbolTicked, toggleSymbol, isSaving, saveError, dismissError } = useCategorySymbols(selectedCategoryKey);

  return {
    state: { isSymbolTicked, isSaving, saveError, categorySelected: !!selectedCategoryKey },
    actions: { toggleSymbol, dismissError },
  };
}, "withCategorySymbols");
