import { fetchJMeta } from "./client";

type RawPriceDto = {
  date: string;
  priceClose: number;
  priceOpen: number;
  priceLow: number;
  priceHigh: number;
  volume: number;
  value: number;
  buyForeignValue: number | null;
  sellForeignValue: number | null;
  buyForeignQuantity: number | null;
  sellForeignQuantity: number | null;
};

export type PriceDaily = {
  date: string;
  close: number;
  open: number;
  low: number;
  high: number;
  volume: number;
  value: number;
  buyForeignValue: number;
  sellForeignValue: number;
  buyForeignQuantity: number;
  sellForeignQuantity: number;
};

export async function fetchPriceRange(symbol: string, from: string, to: string): Promise<PriceDaily[]> {
  const raw = await fetchJMeta<RawPriceDto[]>(`/prices/symbol/${encodeURIComponent(symbol)}/range`, { from, to });
  return raw.map((r) => ({
    date: r.date,
    close: r.priceClose,
    open: r.priceOpen,
    low: r.priceLow,
    high: r.priceHigh,
    volume: r.volume,
    value: r.value,
    buyForeignValue: r.buyForeignValue ?? 0,
    sellForeignValue: r.sellForeignValue ?? 0,
    buyForeignQuantity: r.buyForeignQuantity ?? 0,
    sellForeignQuantity: r.sellForeignQuantity ?? 0,
  }));
}
