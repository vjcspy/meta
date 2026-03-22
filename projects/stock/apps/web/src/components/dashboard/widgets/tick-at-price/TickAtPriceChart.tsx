"use client";

import * as Plot from "@observablehq/plot";
import { useEffect, useMemo, useRef, useState } from "react";

import DashboardWidget from "@/components/dashboard/shared/DashboardWidget";
import { useDashboardStore } from "@/store/dashboard-store";

import type { TickActionValue } from "./classify-ticks";
import {
  classifyTicks,
  TICK_ACTION_COLORS,
  TickAction,
} from "./classify-ticks";
import { useTickDaily } from "./use-tick-daily";

export default function TickAtPriceChart() {
  const symbol = useDashboardStore((s) => s.symbol);
  const fromDate = useDashboardStore((s) => s.fromDate);
  const toDate = useDashboardStore((s) => s.toDate);
  const tradeValueFilter = useDashboardStore((s) => s.tradeValueFilter);
  const { data, isLoading, error } = useTickDaily();

  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const classified = useMemo(() => {
    if (!data) return undefined;
    return classifyTicks(data, tradeValueFilter);
  }, [data, tradeValueFilter]);

  // Render Observable Plot imperatively
  useEffect(() => {
    if (!mounted || !classified || !containerRef.current) return;

    const plot = Plot.plot({
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
  }, [mounted, classified]);

  return (
    <DashboardWidget
      widgetId="w-tick-chart"
      title={`Tick At-Price — ${symbol} (${fromDate} → ${toDate})`}
      canClose
      canMove
      canResize
    >
      {error ? (
        <div className="flex h-full items-center justify-center px-4 text-sm text-destructive">
          {error.message}
        </div>
      ) : isLoading ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Loading tick data...
        </div>
      ) : !classified || classified.length === 0 ? (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          No tick data available
        </div>
      ) : (
        <div ref={containerRef} className="h-full w-full p-3" />
      )}
    </DashboardWidget>
  );
}
