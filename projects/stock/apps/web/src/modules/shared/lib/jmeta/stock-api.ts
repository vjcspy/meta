import { fetchJMeta } from "./client";

// --- Types ---

export type StockInfo = {
  id: number;
  code: string;
  name: string;
  exchange: string;
};

// --- API ---

export async function fetchStocks(): Promise<StockInfo[]> {
  return fetchJMeta<StockInfo[]>("/stocks");
}
