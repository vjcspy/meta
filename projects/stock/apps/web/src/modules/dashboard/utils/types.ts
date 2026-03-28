import type { TickDailySummary } from "@/modules/shared/lib/jmeta/tick-api";

// --- Per-day aggregation for a single symbol ---

export type MarketTickChartData = {
  date: string;
  bSheep: number;
  bShark: number;
  sSheep: number;
  sShark: number;
  /** Cumulative buy sheep */
  sBSheep: number;
  /** Cumulative buy shark */
  sBShark: number;
  /** Cumulative sell sheep */
  sSSheep: number;
  /** Cumulative sell shark */
  sSShark: number;
  diff_sheep: number;
  diff_shark: number;
  diff_sum_sheep: number;
  diff_sum_shark: number;
  pct_buy_sell_sheep: number;
  pct_buy_sell_shark: number;
  pct_buy_sheep_shark: number;
  pct_sell_sheep_shark: number;
  pct_sum_buy_sell_sheep: number;
  pct_sum_buy_sell_shark: number;
  pct_sum_buy_sheep_shark: number;
  pct_sum_sell_sheep_shark: number;
};

// --- Worker output per symbol ---

export type SymbolRangeResult = {
  symbol: string;
  data: MarketTickChartData[];
  tradeValue: number;
};

// --- Worker message types ---

export type WorkerInput = {
  symbolTicks: Array<{ symbol: string; ticks: TickDailySummary[] }>;
  tradeValue: number;
};

export type WorkerOutput = {
  results: SymbolRangeResult[];
};

// --- Cache entry contract ---

export type MarketRangeCacheEntry = {
  symbolResults: SymbolRangeResult[];
  status: "loading" | "ready" | "error";
  error: string | null;
};
