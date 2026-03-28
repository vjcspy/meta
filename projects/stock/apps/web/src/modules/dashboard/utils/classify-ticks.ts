import type { TickDailySummary } from "@/modules/shared/lib/jmeta/tick-api";

// --- Enum & Colors ---

export const TickAction = {
  BUY_SHARK: "B-SHARK",
  BUY_SHEEP: "B-SHEEP",
  SELL_SHARK: "S-SHARK",
  SELL_SHEEP: "S-SHEEP",
  SELL_AT: "S-AT",
  BUY_AT: "B-AT",
} as const;

export type TickActionValue = (typeof TickAction)[keyof typeof TickAction];

/** Single source of truth for tick action colors — ported from old CommonValue */
export const TICK_ACTION_COLORS: Record<TickActionValue, string> = {
  [TickAction.BUY_SHARK]: "rgb(0,255,0)",
  [TickAction.BUY_SHEEP]: "rgb(45,61,202)",
  [TickAction.SELL_SHARK]: "rgb(203,52,52)",
  [TickAction.SELL_SHEEP]: "rgb(239,148,30)",
  [TickAction.SELL_AT]: "pink",
  [TickAction.BUY_AT]: "pink",
};

// --- Types ---

export type ClassifiedTick = {
  time: number;
  vol: number;
  p: number;
  a: TickActionValue;
};

// --- Classification ---

/**
 * Classify normalized ticks into shark/sheep/AT categories.
 *
 * @param dailySummaries - Normalized daily summaries from JMeta
 * @param tradeValueFilter - Threshold in millions VND (default 250)
 * @returns Flat array of classified ticks
 */
export function classifyTicks(dailySummaries: TickDailySummary[], tradeValueFilter: number): ClassifiedTick[] {
  const thresholdRaw = tradeValueFilter * 1e6;
  const result: ClassifiedTick[] = [];

  for (const day of dailySummaries) {
    if (!day.meta) continue;

    for (const tick of day.meta) {
      const tradeValue = tick.p * tick.vol;

      if (tick.a === "B") {
        result.push({
          ...tick,
          a: tradeValue > thresholdRaw ? TickAction.BUY_SHARK : TickAction.BUY_SHEEP,
        });
      } else if (tick.a === "S") {
        result.push({
          ...tick,
          a: tradeValue > thresholdRaw ? TickAction.SELL_SHARK : TickAction.SELL_SHEEP,
        });
      } else {
        // AT/ATO/ATC — split volume equally between buy and sell
        const halfVol = Math.floor(tick.vol / 2);
        result.push({ ...tick, a: TickAction.SELL_AT, vol: halfVol });
        result.push({ ...tick, a: TickAction.BUY_AT, vol: halfVol });
      }
    }
  }

  return result;
}
