import type { TickDailySummary } from "@/lib/jmeta/tick-api";
import type {
  MarketTickChartData,
  SymbolRangeResult,
} from "@/modules/dashboard/utils/types";

// --- Constants ---

const ROUND_VALUE = 10 ** 9;

// --- Helpers ---

function safeRatio(numerator: number, denominator: number): number {
  if (denominator === 0) return 0;
  return Math.round((numerator / denominator) * 100) / 100;
}

// --- Main computation ---

/**
 * Compute SHEEP/SHARK classification and aggregation for a single symbol.
 *
 * Ported from old `calTickRangeData.ts` with value-based aggregation only
 * (viewByValue = true). Output unit is billions VND (tỉ VND), integer precision.
 *
 * Days where `meta` is null produce zero-value rows (not skipped) to ensure
 * a canonical date axis — every date in the range has an entry for every symbol.
 */
export function calTickRangeData(input: {
  symbol: string;
  ticks: TickDailySummary[];
  tradeValue: number;
}): SymbolRangeResult {
  const { symbol, ticks, tradeValue } = input;
  const threshold = tradeValue * 10 ** 6;

  const data: MarketTickChartData[] = [];

  // Running cumulative sums (raw values, pre-division)
  let cumBSheep = 0;
  let cumBShark = 0;
  let cumSSheep = 0;
  let cumSShark = 0;

  // Sort by date to ensure correct cumulative ordering
  const sorted = [...ticks].sort((a, b) => a.date.localeCompare(b.date));

  for (const tick of sorted) {
    let bSheep = 0;
    let bShark = 0;
    let sSheep = 0;
    let sShark = 0;

    // Classify each tick record — null meta produces zero-value row
    if (tick.meta) {
      for (const t of tick.meta) {
        const value = t.p * t.vol;
        if (t.a === "B") {
          if (value > threshold) {
            bShark += value;
          } else {
            bSheep += value;
          }
        } else if (t.a === "S") {
          if (value > threshold) {
            sShark += value;
          } else {
            sSheep += value;
          }
        }
      }
    }

    // Update cumulative sums (raw values)
    cumBSheep += bSheep;
    cumBShark += bShark;
    cumSSheep += sSheep;
    cumSShark += sShark;

    // Percentage ratios — computed on raw (pre-division) values
    const pct_buy_sell_sheep = safeRatio(bSheep, sSheep + bSheep);
    const pct_buy_sell_shark = safeRatio(bShark, bShark + sShark);
    const pct_buy_sheep_shark = safeRatio(bSheep, bShark + bSheep);
    const pct_sell_sheep_shark = safeRatio(sSheep, sShark + sSheep);
    const pct_sum_buy_sell_sheep = safeRatio(cumBSheep, cumBSheep + cumSSheep);
    const pct_sum_buy_sell_shark = safeRatio(cumBShark, cumBShark + cumSShark);
    const pct_sum_buy_sheep_shark = safeRatio(cumBSheep, cumBShark + cumBSheep);
    const pct_sum_sell_sheep_shark = safeRatio(
      cumSSheep,
      cumSShark + cumSSheep,
    );

    data.push({
      date: tick.date,
      bSheep: Math.round(bSheep / ROUND_VALUE),
      bShark: Math.round(bShark / ROUND_VALUE),
      sSheep: Math.round(sSheep / ROUND_VALUE),
      sShark: Math.round(sShark / ROUND_VALUE),
      sBSheep: Math.round(cumBSheep / ROUND_VALUE),
      sBShark: Math.round(cumBShark / ROUND_VALUE),
      sSSheep: Math.round(cumSSheep / ROUND_VALUE),
      sSShark: Math.round(cumSShark / ROUND_VALUE),
      diff_sheep: Math.round((bSheep - sSheep) / ROUND_VALUE),
      diff_shark: Math.round((bShark - sShark) / ROUND_VALUE),
      diff_sum_sheep: Math.round((cumBSheep - cumSSheep) / ROUND_VALUE),
      diff_sum_shark: Math.round((cumBShark - cumSShark) / ROUND_VALUE),
      pct_buy_sell_sheep,
      pct_buy_sell_shark,
      pct_buy_sheep_shark,
      pct_sell_sheep_shark,
      pct_sum_buy_sell_sheep,
      pct_sum_buy_sell_shark,
      pct_sum_buy_sheep_shark,
      pct_sum_sell_sheep_shark,
    });
  }

  return { symbol, data, tradeValue };
}
