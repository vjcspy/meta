import type { ClassifiedTick, TickActionValue } from "./classify-ticks";
import { TickAction } from "./classify-ticks";

// --- Types ---

export type TickSummary = {
  totalBuy: number;
  totalSell: number;
  totalSharkBuy: number;
  totalSharkSell: number;
  totalSheepBuy: number;
  totalSheepSell: number;
};

// --- Calculation ---

/**
 * Calculate buy/sell totals split by shark/sheep from classified ticks.
 * AT ticks are excluded from totals (same as old app behavior).
 */
export function calcTickSummary(data: ClassifiedTick[]): TickSummary {
  let totalBuy = 0;
  let totalSell = 0;
  let totalSharkBuy = 0;
  let totalSharkSell = 0;
  let totalSheepBuy = 0;
  let totalSheepSell = 0;

  for (const tick of data) {
    switch (tick.a as TickActionValue) {
      case TickAction.BUY_SHARK:
        totalBuy += tick.vol;
        totalSharkBuy += tick.vol;
        break;
      case TickAction.BUY_SHEEP:
        totalBuy += tick.vol;
        totalSheepBuy += tick.vol;
        break;
      case TickAction.SELL_SHARK:
        totalSell += tick.vol;
        totalSharkSell += tick.vol;
        break;
      case TickAction.SELL_SHEEP:
        totalSell += tick.vol;
        totalSheepSell += tick.vol;
        break;
      // BUY_AT and SELL_AT excluded from totals
    }
  }

  return {
    totalBuy,
    totalSell,
    totalSharkBuy,
    totalSharkSell,
    totalSheepBuy,
    totalSheepSell,
  };
}
