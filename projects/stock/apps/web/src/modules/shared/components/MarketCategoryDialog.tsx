"use client";

import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { withMarketCategories } from "@/modules/dashboard/hoc/withMarketCategories";
import { useMarketCategoryMutations } from "@/modules/shared/hooks/use-market-categories";
import type { MarketSymbolCategory } from "@/modules/shared/lib/jmeta/market-category-api";

function CategoryForm({
  initial,
  onSubmit,
  onCancel,
  isLoading,
}: {
  initial?: MarketSymbolCategory;
  onSubmit: (data: { name: string; symbols: string[] }) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [name, setName] = useState(initial?.name ?? "");
  const [symbolsText, setSymbolsText] = useState(initial?.symbols.join(", ") ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const symbols = symbolsText
      .split(/[,\s]+/)
      .map((s) => s.trim().toUpperCase())
      .filter(Boolean);
    onSubmit({ name, symbols });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="cat-name" className="text-xs font-medium text-muted-foreground">
          Category Name
        </label>
        <input
          id="cat-name"
          className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. VN30 Leaders"
          required
        />
      </div>
      <div>
        <label htmlFor="cat-symbols" className="text-xs font-medium text-muted-foreground">
          Symbols (comma-separated)
        </label>
        <textarea
          id="cat-symbols"
          className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm"
          rows={3}
          value={symbolsText}
          onChange={(e) => setSymbolsText(e.target.value)}
          placeholder="VNM, VCB, BID, HPG, FPT"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isLoading || !name.trim()}>
          {initial ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
}

type InjectedProps = CombinedProps<[typeof withMarketCategories]>;

function MarketCategoryDialogRender({ state }: InjectedProps) {
  const categories = state.categories;
  const { addCategory, updateCategory, deleteCategory } = useMarketCategoryMutations();

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const editingCategory = editingKey ? categories.find((c) => c.key === editingKey) : null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="no-drag">
          Manage
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold">Market Categories</h2>

        <div className="mt-4 space-y-2">
          {categories.map((cat) => (
            <div key={cat.key} className="flex items-center justify-between rounded-md border px-3 py-2">
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium">{cat.name}</div>
                <div className="truncate text-xs text-muted-foreground">{cat.symbols.join(", ")}</div>
              </div>
              <div className="ml-2 flex items-center gap-1">
                <button
                  type="button"
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-accent"
                  onClick={() => {
                    setEditingKey(cat.key);
                    setShowNewForm(false);
                  }}
                  aria-label={`Edit ${cat.name}`}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                {deleteConfirm === cat.key ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => {
                      deleteCategory.mutate(cat.key);
                      setDeleteConfirm(null);
                    }}
                    disabled={deleteCategory.isPending}
                  >
                    Confirm
                  </Button>
                ) : (
                  <button
                    type="button"
                    className="inline-flex h-7 w-7 items-center justify-center rounded-md text-destructive hover:bg-accent"
                    onClick={() => setDeleteConfirm(cat.key)}
                    aria-label={`Delete ${cat.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {editingCategory && (
          <div className="mt-4 rounded-md border p-3">
            <h3 className="mb-2 text-sm font-medium">Editing: {editingCategory.name}</h3>
            <CategoryForm
              initial={editingCategory}
              onSubmit={(data) => {
                updateCategory.mutate(
                  { key: editingCategory.key, updates: data },
                  { onSuccess: () => setEditingKey(null) },
                );
              }}
              onCancel={() => setEditingKey(null)}
              isLoading={updateCategory.isPending}
            />
          </div>
        )}

        {showNewForm && !editingKey && (
          <div className="mt-4 rounded-md border p-3">
            <h3 className="mb-2 text-sm font-medium">New Category</h3>
            <CategoryForm
              onSubmit={(data) => {
                addCategory.mutate(data, {
                  onSuccess: () => setShowNewForm(false),
                });
              }}
              onCancel={() => setShowNewForm(false)}
              isLoading={addCategory.isPending}
            />
          </div>
        )}

        <div className="mt-4 flex justify-between">
          {!showNewForm && !editingKey && (
            <Button variant="outline" size="sm" onClick={() => setShowNewForm(true)}>
              <Plus className="mr-1 h-3.5 w-3.5" />
              New Category
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="ghost" size="sm" className="ml-auto">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default combineHOC(withMarketCategories)(MarketCategoryDialogRender);
