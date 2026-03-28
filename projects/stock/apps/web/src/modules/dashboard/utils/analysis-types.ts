import type { CorInfo } from "@/modules/shared/lib/jmeta/cor-api";
import type { PriceDaily } from "@/modules/shared/lib/jmeta/prices-api";

export type AnalysisRow = {
  symbol: string;
  industryName1: string;
  industryName2: string;
  industryName3: string;
  totalShares: number;

  trade_value_7: number;
  trade_value_15: number;
  trade_value_30: number;
  trade_value_range: number;

  foreign_buy_7: number;
  foreign_buy_15: number;
  foreign_buy_30: number;
  foreign_buy_range: number;

  foreign_sell_7: number;
  foreign_sell_15: number;
  foreign_sell_30: number;
  foreign_sell_range: number;

  foreign_diff_7: number;
  foreign_diff_15: number;
  foreign_diff_30: number;
  foreign_diff_range: number;

  // HullMA — populated in Phase 5; defaulted to 0 until then
  l16_hullma_trend: 1 | 0 | -1;
  l16_hullma_day_in_trend: number;
  l16_hullma_highest_diff_percent: number;
};

export type AnalysisWorkerInput = {
  symbolPrices: Array<{ symbol: string; prices: PriceDaily[] }>;
  cors: CorInfo[];
  fromDate: string;
  toDate: string;
  tradeValueFilter: number;
};

export type AnalysisWorkerOutput = {
  rows: AnalysisRow[];
};

export type AnalysisCacheEntry = {
  rows: AnalysisRow[];
  status: "loading" | "ready" | "error";
  error: string | null;
};
