// Chart.js + react-chartjs-2
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title as ChartTitle,
  Tooltip,
} from "chart.js";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import { Button } from "@/components/ui/button";
// Use shadcn/ui components via direct import
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// RGL needs window, so we disable SSR via dynamic import
const ResponsiveGrid: any = dynamic(
  async () => {
    // @ts-expect-error: Dynamic import
    const mod = await import("react-grid-layout");
    return mod.WidthProvider(mod.Responsive);
  },
  { ssr: false },
);

// Register Chart.js core components once (no zoom plugin here - register it client-side)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  ChartTitle,
  Filler,
);

export default function DashboardPage() {
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const layouts = useMemo(
    () => ({
      lg: [
        { i: "w1", x: 0, y: 0, w: 6, h: 12, minW: 4, minH: 8 },
        { i: "w2", x: 6, y: 0, w: 6, h: 12, minW: 4, minH: 8 },
        { i: "w3", x: 0, y: 12, w: 6, h: 10, minW: 3, minH: 6 },
      ],
    }),
    [],
  );

  // Avoid SSR hydration issues with Chart.js by rendering charts only on client
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Register zoom plugin only on client
  useEffect(() => {
    let active = true;
    (async () => {
      if (typeof window === "undefined") return;
      try {
        const mod: any = await import("chartjs-plugin-zoom");
        const plugin = mod.default ?? mod;
        if (active) ChartJS.register(plugin);
      } catch (e) {
        console.warn("Failed to load chartjs-plugin-zoom", e);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Sample data
  const labels = useMemo(
    () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    [],
  );

  const lineData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Price",
          data: [102, 104, 101, 106, 110, 108, 112],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59,130,246,0.25)",
          fill: true,
          tension: 0.3,
          pointRadius: 2,
        },
      ],
    }),
    [labels],
  );

  const barData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: "Volume",
          data: [1200, 1800, 1500, 2200, 2600, 1900, 2400],
          backgroundColor: "rgba(16,185,129,0.7)",
          borderColor: "#10b981",
        },
      ],
    }),
    [labels],
  );

  const doughnutData = useMemo(
    () => ({
      labels: ["AAPL", "MSFT", "GOOGL", "AMZN", "META"],
      datasets: [
        {
          label: "Allocation",
          data: [30, 25, 20, 15, 10],
          backgroundColor: [
            "#60a5fa",
            "#34d399",
            "#fbbf24",
            "#f87171",
            "#c084fc",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [],
  );

  const commonOptions: any = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "nearest", intersect: false },
      plugins: {
        legend: { position: "top" as const },
        title: { display: false, text: "" },
        zoom: {
          zoom: {
            wheel: { enabled: true },
            pinch: { enabled: true },
            mode: "x" as const,
          },
          pan: { enabled: true, mode: "x" as const },
          limits: { x: { minRange: 1 } },
        },
      },
      scales: {
        x: { grid: { color: "rgba(0,0,0,0.05)" } },
        y: { grid: { color: "rgba(0,0,0,0.05)" } },
      },
    }),
    [],
  );

  // Chart refs for reset zoom
  const lineRef = useRef<any>(null);
  const barRef = useRef<any>(null);
  const doughnutRef = useRef<any>(null);

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-background">
      <ResponsiveGrid
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={24}
        margin={[12, 12]}
        containerPadding={[12, 12]}
        compactType="vertical"
        isBounded
        draggableHandle=".rgl-drag-handle"
        draggableCancel=".no-drag"
      >
        {/* Line Chart */}
        <div key="w1" className="h-full w-full">
          <Card className="flex h-full w-full flex-col overflow-hidden">
            <CardHeader className="grid grid-cols-[1fr_auto] items-center gap-2 border-b px-4 py-3">
              <CardTitle className="rgl-drag-handle cursor-move select-none text-base">
                Price Over Time
              </CardTitle>
              <CardAction className="no-drag">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => lineRef.current?.resetZoom?.()}
                >
                  Reset zoom
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full w-full p-3">
                {mounted ? (
                  <Line ref={lineRef} data={lineData} options={commonOptions} />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Loading chart...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <div key="w2" className="h-full w-full">
          <Card className="flex h-full w-full flex-col overflow-hidden">
            <CardHeader className="grid grid-cols-[1fr_auto] items-center gap-2 border-b px-4 py-3">
              <CardTitle className="rgl-drag-handle cursor-move select-none text-base">
                Volume by Day
              </CardTitle>
              <CardAction className="no-drag">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => barRef.current?.resetZoom?.()}
                >
                  Reset zoom
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full w-full p-3">
                {mounted ? (
                  <Bar ref={barRef} data={barData} options={commonOptions} />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Loading chart...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doughnut Chart */}
        <div key="w3" className="h-full w-full">
          <Card className="flex h-full w-full flex-col overflow-hidden">
            <CardHeader className="grid grid-cols-[1fr_auto] items-center gap-2 border-b px-4 py-3">
              <CardTitle className="rgl-drag-handle cursor-move select-none text-base">
                Portfolio Allocation
              </CardTitle>
              <CardAction className="no-drag">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => doughnutRef.current?.resetZoom?.()}
                >
                  Reset zoom
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
              <div className="h-full w-full p-3">
                {mounted ? (
                  <Doughnut
                    ref={doughnutRef}
                    data={doughnutData}
                    options={{ ...commonOptions, scales: {} }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Loading chart...
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </ResponsiveGrid>
    </div>
  );
}
