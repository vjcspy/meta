"use client";

import { AlertCircle, ChevronDown, Loader2, Tag, X } from "lucide-react";

import { useCategorySymbols } from "@/modules/configuration/hooks/use-category-symbols";
import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";
import { useMarketCategories } from "@/modules/shared/hooks/use-market-categories";

import { StockCategoryTable } from "./StockCategoryTable";

// --- Component ---

export function StockCategoryConfig() {
  const { data: categories, isLoading: categoriesLoading } = useMarketCategories();
  const selectedCategoryKey = useDashboardModuleStore((s) => s.selectedCategoryKey);
  const setSelectedCategoryKey = useDashboardModuleStore((s) => s.setSelectedCategoryKey);

  const selectedCategory = categories?.find((c) => c.key === selectedCategoryKey) ?? null;

  const { isSymbolTicked, toggleSymbol, isSaving, saveError, dismissError } = useCategorySymbols(selectedCategoryKey);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="shrink-0 border-b border-border bg-background px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-foreground">Stock Category</h2>
            <p className="mt-0.5 text-[11px] text-muted-foreground">Manage which stocks belong to each category</p>
          </div>

          {/* Save indicator */}
          <div className="flex items-center gap-3">
            {isSaving && (
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <Loader2 className="size-3 animate-spin" />
                <span>Saving…</span>
              </div>
            )}
          </div>
        </div>

        {/* Category selector */}
        <div className="mt-4">
          <div className="relative inline-block">
            <select
              value={selectedCategoryKey ?? ""}
              onChange={(e) => setSelectedCategoryKey(e.target.value || null)}
              disabled={categoriesLoading}
              className="h-10 appearance-none rounded-lg border border-input bg-background py-0 pl-9 pr-10 text-sm font-medium outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
              style={{ minWidth: 280 }}
            >
              <option value="">Select a category…</option>
              {categories?.map((cat) => (
                <option key={cat.key} value={cat.key}>
                  {cat.name} ({cat.symbols.length} symbols)
                </option>
              ))}
            </select>
            <Tag className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>

          {selectedCategory && (
            <span className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary">
              <span className="inline-block size-1.5 rounded-full bg-primary" />
              {selectedCategory.symbols.length} symbols in category
            </span>
          )}
        </div>
      </div>

      {/* Error toast */}
      {saveError && (
        <div className="mx-6 mt-3 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-2.5 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" />
          <span className="flex-1">{saveError}</span>
          <button type="button" onClick={dismissError} className="shrink-0 hover:text-foreground">
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* No category hint */}
      {!selectedCategoryKey && !categoriesLoading && (
        <div className="mx-6 mt-3 flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-2.5 text-xs text-muted-foreground">
          <Tag className="size-3.5 shrink-0" />
          <span>Select a category above to enable stock assignment</span>
        </div>
      )}

      {/* Stock table */}
      <div className="flex-1 overflow-hidden">
        <StockCategoryTable
          isSymbolTicked={isSymbolTicked}
          toggleSymbol={toggleSymbol}
          categorySelected={!!selectedCategoryKey}
        />
      </div>
    </div>
  );
}
