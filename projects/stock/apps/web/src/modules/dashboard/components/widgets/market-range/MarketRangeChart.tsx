"use client";

import { type CombinedProps, combineHOC } from "@web/ui-extension";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

import DashboardWidget from "@/modules/dashboard/components/DashboardWidget";
import { withChartToggles } from "@/modules/dashboard/hoc/withChartToggles";
import { withMarketRangeResults } from "@/modules/dashboard/hoc/withMarketRangeResults";
import type { MarketTickChartData } from "@/modules/dashboard/utils/types";

ChartJS.register(CategoryScale, LinearScale, TimeScale, PointElement, LineElement, Title, Tooltip, Legend, zoomPlugin);

const COLORS = {
  buySheep: "rgb(45, 61, 202)",
  buyShark: "rgb(0, 255, 0)",
  sellSheep: "rgb(239, 148, 30)",
  sellShark: "rgb(203, 52, 52)",
  vnIndex: "rgb(128, 128, 128)",
} as const;

type InjectedProps = CombinedProps<[typeof withMarketRangeResults, typeof withChartToggles]>;

function MarketRangeChartRender({ state, actions }: InjectedProps) {
  const { symbolResults, vnIndexData, isLoading, error } = state;
  const { showSumSheep, showSumShark, showSheep, showShark } = state;

  const { aggregated, dates } = useMemo(() => {
    if (!symbolResults.length) return { aggregated: [], dates: [] };

    const dateMap = new Map<string, MarketTickChartData>();

    for (const sr of symbolResults) {
      for (const d of sr.data) {
        const existing = dateMap.get(d.date);
        if (existing) {
          existing.bSheep += d.bSheep;
          existing.bShark += d.bShark;
          existing.sSheep += d.sSheep;
          existing.sShark += d.sShark;
          existing.sBSheep += d.sBSheep;
          existing.sBShark += d.sBShark;
          existing.sSSheep += d.sSSheep;
          existing.sSShark += d.sSShark;
          existing.diff_sheep += d.diff_sheep;
          existing.diff_shark += d.diff_shark;
          existing.diff_sum_sheep += d.diff_sum_sheep;
          existing.diff_sum_shark += d.diff_sum_shark;
        } else {
          dateMap.set(d.date, { ...d });
        }
      }
    }

    const sortedDates = [...dateMap.keys()].sort();
    const agg = sortedDates.map((date) => dateMap.get(date)!);

    return { aggregated: agg, dates: sortedDates };
  }, [symbolResults]);

  const vnIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const d of vnIndexData) {
      map.set(d.date, d.close);
    }
    return map;
  }, [vnIndexData]);

  const chartData = useMemo(() => {
    const datasets: {
      label: string;
      data: (number | null)[];
      borderColor: string;
      backgroundColor: string;
      yAxisID: string;
      borderWidth: number;
      pointRadius: number;
      tension: number;
      hidden?: boolean;
    }[] = [];

    if (showSumSheep) {
      datasets.push({
        label: "Σ Diff Sheep",
        data: aggregated.map((d) => d.diff_sum_sheep),
        borderColor: COLORS.buySheep,
        backgroundColor: COLORS.buySheep,
        yAxisID: "y",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      });
    }

    if (showSumShark) {
      datasets.push({
        label: "Σ Diff Shark",
        data: aggregated.map((d) => d.diff_sum_shark),
        borderColor: COLORS.buyShark,
        backgroundColor: COLORS.buyShark,
        yAxisID: "y",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.2,
      });
    }

    if (showSheep) {
      datasets.push(
        {
          label: "Buy Sheep",
          data: aggregated.map((d) => d.bSheep),
          borderColor: COLORS.buySheep,
          backgroundColor: COLORS.buySheep,
          yAxisID: "y",
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.2,
        },
        {
          label: "Sell Sheep",
          data: aggregated.map((d) => d.sSheep),
          borderColor: COLORS.sellSheep,
          backgroundColor: COLORS.sellSheep,
          yAxisID: "y",
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.2,
        },
      );
    }

    if (showShark) {
      datasets.push(
        {
          label: "Buy Shark",
          data: aggregated.map((d) => d.bShark),
          borderColor: COLORS.buyShark,
          backgroundColor: COLORS.buyShark,
          yAxisID: "y",
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.2,
        },
        {
          label: "Sell Shark",
          data: aggregated.map((d) => d.sShark),
          borderColor: COLORS.sellShark,
          backgroundColor: COLORS.sellShark,
          yAxisID: "y",
          borderWidth: 1.5,
          pointRadius: 0,
          tension: 0.2,
        },
      );
    }

    datasets.push({
      label: "VN-Index",
      data: dates.map((date) => vnIndexMap.get(date) ?? null),
      borderColor: COLORS.vnIndex,
      backgroundColor: COLORS.vnIndex,
      yAxisID: "y1",
      borderWidth: 1.5,
      pointRadius: 0,
      tension: 0.2,
    });

    return { labels: dates, datasets };
  }, [aggregated, dates, vnIndexMap, showSumSheep, showSumShark, showSheep, showShark]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index" as const,
        intersect: false,
      },
      scales: {
        x: {
          ticks: {
            maxRotation: 45,
            font: { size: 10 },
          },
          grid: { display: false },
        },
        y: {
          position: "left" as const,
          title: { display: true, text: "Value (tỉ VND)", font: { size: 11 } },
          ticks: { font: { size: 10 } },
        },
        y1: {
          position: "right" as const,
          title: { display: true, text: "VN-Index", font: { size: 11 } },
          ticks: { font: { size: 10 } },
          grid: { drawOnChartArea: false },
        },
      },
      plugins: {
        legend: {
          position: "top" as const,
          labels: { usePointStyle: true, font: { size: 10 } },
        },
        zoom: {
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "x" as const,
          },
          pan: {
            enabled: true,
            mode: "x" as const,
          },
        },
      },
    }),
    [],
  );

  const headerAction = (
    <div className="no-drag flex items-center gap-3 text-xs">
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          checked={showSumSheep}
          onChange={(e) => actions.setShowSumSheep(e.target.checked)}
          className="h-3 w-3"
        />
        Σ Sheep
      </label>
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          checked={showSumShark}
          onChange={(e) => actions.setShowSumShark(e.target.checked)}
          className="h-3 w-3"
        />
        Σ Shark
      </label>
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          checked={showSheep}
          onChange={(e) => actions.setShowSheep(e.target.checked)}
          className="h-3 w-3"
        />
        Sheep
      </label>
      <label className="flex items-center gap-1 cursor-pointer">
        <input
          type="checkbox"
          checked={showShark}
          onChange={(e) => actions.setShowShark(e.target.checked)}
          className="h-3 w-3"
        />
        Shark
      </label>
    </div>
  );

  return (
    <DashboardWidget widgetId="w-market-range-chart" title="Market Range Chart" headerAction={headerAction}>
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <span className="ml-2 text-sm text-muted-foreground">Computing…</span>
        </div>
      )}

      {error && <div className="p-4 text-sm text-destructive">Error: {error}</div>}

      {!isLoading && !error && aggregated.length === 0 && (
        <div className="p-8 text-center text-sm text-muted-foreground">
          Select a category to view market range chart
        </div>
      )}

      {!isLoading && !error && aggregated.length > 0 && (
        <div className="h-full w-full p-2" style={{ minHeight: "300px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </DashboardWidget>
  );
}

export default combineHOC(withMarketRangeResults, withChartToggles)(MarketRangeChartRender);
