import { fetchJMeta } from "./client";

export type CorInfo = {
  code: string;
  exchange: string;
  industryName1: string;
  industryName2: string;
  industryName3: string;
  totalShares: number;
  name: string;
};

type RawStock = {
  code: string;
  exchange: string;
  industryName1: string | null;
  industryName2: string | null;
  industryName3: string | null;
  totalShares: number | string | null;
  name: string;
};

export async function fetchAllCors(): Promise<CorInfo[]> {
  const stocks = await fetchJMeta<RawStock[]>("/stocks");
  return stocks.map((s) => ({
    code: s.code,
    exchange: s.exchange,
    industryName1: s.industryName1 ?? "",
    industryName2: s.industryName2 ?? "",
    industryName3: s.industryName3 ?? "",
    totalShares: Number(s.totalShares) || 0,
    name: s.name ?? "",
  }));
}
