"use client";

import { useMemo } from "react";

import { useTickDaily } from "./use-tick-daily";
import { classifyTicks, TICK_ACTION_COLORS, TickAction } from "./classify-ticks";
import { calcTickSummary } from "./calc-tick-summary";
import DashboardWidget from "@/components/dashboard/shared/DashboardWidget";
import { useDashboardStore } from "@/store/dashboard-store";

function formatVol(vol: number): string {
  if (vol >= 1e6) return `${(vol / 1e6).toFixed(2)}M`;
  if (vol >= 1e3) return `${(vol / 1e3).toFixed(1)}K`;
  return vol.toLocaleString();
}

export default function TickAtPriceSummary() {
  const tradeValueFilter = useDashboardStore((s) => s.tradeValueFilter);
  const { data, isLoading, error } = useTickDaily();

  const summary = useMemo(() => {
    if (!data) return null;
    const classified = classifyTicks(data, tradeValueFilter);
    return calcTickSummary(classified);
  }, [data, tradeValueFilter]);

  const netFlow = summary ? summary.totalBuy - summary.totalSell : 0;

  return (
    <DashboardWidget
      widgetId="w-tick-summary"
      title="Tick Summary"
      canClose
      canMove
      canResize
    >
      <div className="p-4">
        {error ? (
          <div className="text-sm text-destructive">{error.message}</div>
        ) : isLoading ? (
          <div className="text-sm text-muted-foreground">Loading...</div>
        ) : !summary ? (
          <div className="text-sm text-muted-foreground">No data</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 text-sm">
            {/* Total Buy */}
            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Total Buy
              </div>
              <div className="text-lg font-semibold" style={{ color: TICK_ACTION_COLORS[TickAction.BUY_SHARK] }}>
                {formatVol(summary.totalBuy)}
              </div>
            </div>

            {/* Total Sell */}
            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Total Sell
              </div>
              <div className="text-lg font-semibold" style={{ color: TICK_ACTION_COLORS[TickAction.SELL_SHARK] }}>
                {formatVol(summary.totalSell)}
              </div>
            </div>

            {/* Shark Buy */}
            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Shark Buy
              </div>
              <div className="font-medium" style={{ color: TICK_ACTION_COLORS[TickAction.BUY_SHARK] }}>
                {formatVol(summary.totalSharkBuy)}
              </div>
            </div>

            {/* Shark Sell */}
            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Shark Sell
              </div>
              <div className="font-medium" style={{ color: TICK_ACTION_COLORS[TickAction.SELL_SHARK] }}>
                {formatVol(summary.totalSharkSell)}
              </div>
            </div>

            {/* Sheep Buy */}
            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Sheep Buy
              </div>
              <div className="font-medium" style={{ color: TICK_ACTION_COLORS[TickAction.BUY_SHEEP] }}>
                {formatVol(summary.totalSheepBuy)}
              </div>
            </div>

            {/* Sheep Sell */}
            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Sheep Sell
              </div>
              <div className="font-medium" style={{ color: TICK_ACTION_COLORS[TickAction.SELL_SHEEP] }}>
                {formatVol(summary.totalSheepSell)}
              </div>
            </div>

            {/* Net Flow — full width */}
            <div className="col-span-2 rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Net Flow (Buy − Sell)
              </div>
              <div
                className="text-lg font-bold"
                style={{ color: netFlow >= 0 ? TICK_ACTION_COLORS[TickAction.BUY_SHARK] : TICK_ACTION_COLORS[TickAction.SELL_SHARK] }}
              >
                {netFlow >= 0 ? "+" : ""}
                {formatVol(netFlow)}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardWidget>
  );
}

