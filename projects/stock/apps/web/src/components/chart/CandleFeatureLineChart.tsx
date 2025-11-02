"use client";

import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

// Register core components once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
);

type Series = {
  id: string;
  label: string;
  data: (number | null)[];
  color?: string;
};

export type CandleFeatureLineChartProps = {
  labels: string[];
  series: Series[];
};

const DEFAULT_COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#14b8a6", // teal-500
  "#22c55e", // green-500
  "#f97316", // orange-500
  "#e11d48", // rose-600
  "#64748b", // slate-500
];

export function CandleFeatureLineChart({
  labels,
  series,
}: CandleFeatureLineChartProps) {
  const chartRef = useRef<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);
  const data = useMemo(() => {
    const datasets = series.map((s, i) => {
      const isPriceAxis = s.id === "close" || s.id.endsWith("_price");
      return {
        label: s.label,
        data: s.data,
        borderColor: s.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length],
        backgroundColor: "transparent",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 1.75,
        pointHoverRadius: 3,
        fill: false,
        // Assign dataset to appropriate Y axis
        yAxisID: isPriceAxis ? "y" : "y1",
      };
    });
    return { labels, datasets } as const;
  }, [labels, series]);

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      // Multi-axis often works best with index mode
      interaction: { mode: "index", intersect: false },
      plugins: {
        legend: { position: "top" as const },
        title: { display: false, text: "" },
      },
      scales: {
        x: { grid: { color: "rgba(0,0,0,0.05)" } },
        // Left axis: price-like series
        y: {
          type: "linear" as const,
          display: true,
          position: "left" as const,
          grid: { color: "rgba(0,0,0,0.05)" },
        },
        // Right axis: non-price series
        y1: {
          type: "linear" as const,
          display: true,
          position: "right" as const,
          // Only show grid for the left axis to reduce clutter
          grid: { drawOnChartArea: false },
        },
      },
    }),
    [],
  );

  return (
    <div className="h-full w-full p-3">
      {mounted ? (
        <Line ref={chartRef} data={data as any} options={options as any} />
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Loading chart...
        </div>
      )}
    </div>
  );
}

export default CandleFeatureLineChart;
