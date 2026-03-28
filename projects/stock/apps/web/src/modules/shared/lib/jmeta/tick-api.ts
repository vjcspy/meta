import { fetchJMeta } from "./client";

// --- Types ---

/** Raw tuple from JMeta: [epoch_sec, vol, price, side] */
export type RawTickTuple = [number, number, number, string];

/** Raw shape from JMeta endpoint */
export type RawTickDailySummary = {
  date: string;
  meta: RawTickTuple[] | null;
  close: number;
  open: number;
  low: number;
  high: number;
  totalTrade: number;
};

/** Normalized tick record */
export type TickRecord = {
  time: number;
  vol: number;
  p: number;
  a: string;
};

/** Normalized daily summary with typed tick records */
export type TickDailySummary = {
  date: string;
  meta: TickRecord[] | null;
  close: number;
  open: number;
  low: number;
  high: number;
  totalTrade: number;
};

// --- Normalization ---

function normalizeMeta(raw: RawTickTuple[] | null): TickRecord[] | null {
  if (!raw) return null;

  return raw.map(([time, vol, p, a]) => ({ time, vol, p, a }));
}

// --- API ---

export async function fetchTickDaily(symbol: string, from: string, to: string): Promise<TickDailySummary[]> {
  const rawData = await fetchJMeta<RawTickDailySummary[]>(`/ticks/symbol/${encodeURIComponent(symbol)}/daily`, {
    from,
    to,
  });

  return rawData.map((item) => ({
    ...item,
    meta: normalizeMeta(item.meta),
  }));
}
