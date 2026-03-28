import { fetchJMeta, JMetaError, mutateJMeta } from "./client";

// --- Types ---

export type MarketSymbolCategory = {
  key: string;
  name: string;
  symbols: string[];
};

// --- API ---

export async function fetchMarketCategories(): Promise<MarketSymbolCategory[]> {
  try {
    const config = await fetchJMeta<{ value: MarketSymbolCategory[] }>("/configurations/market-categories");
    return config.value ?? [];
  } catch (e) {
    if (e instanceof JMetaError && e.status === 404) return [];
    throw e;
  }
}

export async function saveMarketCategories(categories: MarketSymbolCategory[]): Promise<void> {
  await mutateJMeta("/configurations/market-categories", "PUT", {
    key: "market-categories",
    value: categories,
  });
}
