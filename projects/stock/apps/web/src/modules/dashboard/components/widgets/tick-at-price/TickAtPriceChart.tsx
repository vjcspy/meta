"use client";

import * as Plot from "@observablehq/plot";
import { type CombinedProps, combineHOC } from "@web/ui-extension";
import { useEffect, useRef, useState } from "react";

import DashboardWidget from "@/modules/dashboard/components/DashboardWidget";
import { withTickData } from "@/modules/dashboard/hoc/withTickData";
import type { TickActionValue } from "@/modules/dashboard/utils/classify-ticks";
import {
  TICK_ACTION_COLORS,
  TickAction,
} from "@/modules/dashboard/utils/classify-ticks";
import { withDateRange } from "@/modules/shared/hoc/withDateRange";
import { withSymbol } from "@/modules/shared/hoc/withSymbol";

type InjectedProps = CombinedProps<
  [typeof withSymbol, typeof withDateRange, typeof withTickData]
>;

/**
 * Render exception — data purity enforced (all from HOCs), but imperative
 * Observable Plot rendering retains useRef/useState/useEffect hooks.
 */
function TickAtPriceChartRender({ state }: InjectedProps) {
  const { symbol, fromDate, toDate } = state;
  const {
    classifiedTicks: classified,
    ticksLoading: isLoading,
    ticksError: error,
  } = state;

  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && w > 0) setContainerWidth(w);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [mounted]);

  useEffect(() => {
    if (
      !mounted ||
      !classified ||
      !containerRef.current ||
      containerWidth === 0
    )
      return;

    const plot = Plot.plot({
      width: containerWidth,
      marginTop: 20,
      marginRight: 20,
      marginBottom: 30,
      marginLeft: 140,
      grid: true,
      color: {
        legend: true,
        domain: Object.values(TickAction),
        range: Object.values(TickAction).map(
          (a) => TICK_ACTION_COLORS[a as TickActionValue],
        ),
      },
      style: { background: "transparent" },
      marks: [
        Plot.barX(
          classified,
          Plot.groupY(
            {
              x: (d: { a: string; vol: number; p: number }[]) => {
                return d.reduce((sum, tick) => {
                  if (tick.a[0] === "B") return sum + tick.vol * tick.p;
                  if (tick.a[0] === "S") return sum - tick.vol * tick.p;
                  return sum;
                }, 0);
              },
            },
            {
              fill: "a",
              y: "p",
            },
          ),
        ),
      ],
    });

    containerRef.current.append(plot);

    return () => {
      plot.remove();
    };
  }, [mounted, classified, containerWidth]);

  return (
    <DashboardWidget
      widgetId="w-tick-chart"
      title={`Tick At-Price — ${symbol} (${fromDate} → ${toDate})`}
      canClose
      canMove
      canResize
    >
      <div ref={containerRef} className="relative h-full w-full p-3">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center px-4 text-sm text-destructive">
            {error.message}
          </div>
        ) : isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            Loading tick data...
          </div>
        ) : !classified || classified.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            No tick data available
          </div>
        ) : null}
      </div>
    </DashboardWidget>
  );
}

export default combineHOC(
  withSymbol,
  withDateRange,
  withTickData,
)(TickAtPriceChartRender);
