"use client";

import { type CombinedProps, combineHOC } from "@web/ui-extension";

import DashboardWidget from "@/modules/dashboard/components/DashboardWidget";
import { withTickData } from "@/modules/dashboard/hoc/withTickData";
import {
  TICK_ACTION_COLORS,
  TickAction,
} from "@/modules/dashboard/utils/classify-ticks";

function formatVol(vol: number): string {
  if (vol >= 1e6) return `${(vol / 1e6).toFixed(2)}M`;
  if (vol >= 1e3) return `${(vol / 1e3).toFixed(1)}K`;
  return vol.toLocaleString();
}

type InjectedProps = CombinedProps<[typeof withTickData]>;

function TickAtPriceSummaryRender({ state }: InjectedProps) {
  const {
    tickSummary: summary,
    ticksLoading: isLoading,
    ticksError: error,
  } = state;
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
            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Total Buy
              </div>
              <div
                className="text-lg font-semibold"
                style={{ color: TICK_ACTION_COLORS[TickAction.BUY_SHARK] }}
              >
                {formatVol(summary.totalBuy)}
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Total Sell
              </div>
              <div
                className="text-lg font-semibold"
                style={{ color: TICK_ACTION_COLORS[TickAction.SELL_SHARK] }}
              >
                {formatVol(summary.totalSell)}
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Shark Buy
              </div>
              <div
                className="font-medium"
                style={{ color: TICK_ACTION_COLORS[TickAction.BUY_SHARK] }}
              >
                {formatVol(summary.totalSharkBuy)}
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Shark Sell
              </div>
              <div
                className="font-medium"
                style={{ color: TICK_ACTION_COLORS[TickAction.SELL_SHARK] }}
              >
                {formatVol(summary.totalSharkSell)}
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Sheep Buy
              </div>
              <div
                className="font-medium"
                style={{ color: TICK_ACTION_COLORS[TickAction.BUY_SHEEP] }}
              >
                {formatVol(summary.totalSheepBuy)}
              </div>
            </div>

            <div className="rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Sheep Sell
              </div>
              <div
                className="font-medium"
                style={{ color: TICK_ACTION_COLORS[TickAction.SELL_SHEEP] }}
              >
                {formatVol(summary.totalSheepSell)}
              </div>
            </div>

            <div className="col-span-2 rounded-md border p-3">
              <div className="mb-1 text-xs text-muted-foreground">
                Net Flow (Buy − Sell)
              </div>
              <div
                className="text-lg font-bold"
                style={{
                  color:
                    netFlow >= 0
                      ? TICK_ACTION_COLORS[TickAction.BUY_SHARK]
                      : TICK_ACTION_COLORS[TickAction.SELL_SHARK],
                }}
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

export default combineHOC(withTickData)(TickAtPriceSummaryRender);
