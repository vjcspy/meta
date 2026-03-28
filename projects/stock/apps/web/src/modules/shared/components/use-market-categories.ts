import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchMarketCategories,
  type MarketSymbolCategory,
  saveMarketCategories,
} from "@/modules/shared/lib/jmeta/market-category-api";

// --- Query Hook ---

const CATEGORIES_KEY = ["market-categories"] as const;

export function useMarketCategories() {
  return useQuery({
    queryKey: CATEGORIES_KEY,
    queryFn: fetchMarketCategories,
    staleTime: 5 * 60 * 1000, // 5 minutes — categories rarely change
  });
}

// --- Mutation Hooks ---

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function useMarketCategoryMutations() {
  const queryClient = useQueryClient();

  const addCategory = useMutation({
    mutationFn: async (cat: Omit<MarketSymbolCategory, "key">) => {
      const current =
        queryClient.getQueryData<MarketSymbolCategory[]>(CATEGORIES_KEY) ?? [];
      const key = slugify(cat.name);
      const updated = [...current, { ...cat, key }];
      await saveMarketCategories(updated);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  });

  const updateCategory = useMutation({
    mutationFn: async ({
      key,
      updates,
    }: {
      key: string;
      updates: Partial<Omit<MarketSymbolCategory, "key">>;
    }) => {
      const current =
        queryClient.getQueryData<MarketSymbolCategory[]>(CATEGORIES_KEY) ?? [];
      const updated = current.map((c) =>
        c.key === key ? { ...c, ...updates } : c,
      );
      await saveMarketCategories(updated);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  });

  const deleteCategory = useMutation({
    mutationFn: async (key: string) => {
      const current =
        queryClient.getQueryData<MarketSymbolCategory[]>(CATEGORIES_KEY) ?? [];
      const updated = current.filter((c) => c.key !== key);
      await saveMarketCategories(updated);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: CATEGORIES_KEY }),
  });

  return { addCategory, updateCategory, deleteCategory };
}
