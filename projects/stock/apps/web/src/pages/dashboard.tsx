import dynamic from "next/dynamic";
import { useMemo } from "react";

import DashboardFilters from "@/components/dashboard/shared/DashboardFilters";
import { useDashboardStore } from "@/store/dashboard-store";

// Observable Plot uses DOM — must be client-only
const TickAtPriceChart = dynamic(
  () => import("@/components/dashboard/widgets/tick-at-price/TickAtPriceChart"),
  { ssr: false },
);

const TickAtPriceSummary = dynamic(
  () =>
    import("@/components/dashboard/widgets/tick-at-price/TickAtPriceSummary"),
  { ssr: false },
);

// RGL needs window, so we disable SSR via dynamic import
const ResponsiveGrid: any = dynamic(
  async () => {
    // @ts-expect-error: Dynamic import
    const mod = await import("react-grid-layout");
    return mod.WidthProvider(mod.Responsive);
  },
  { ssr: false },
);

export default function DashboardPage() {
  const visibleWidgets = useDashboardStore((s) => s.visibleWidgets);

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const layouts = useMemo(
    () => ({
      lg: [
        {
          i: "w-filters",
          x: 0,
          y: 0,
          w: 12,
          h: 4,
          minW: 6,
          minH: 3,
          static: true,
        },
        { i: "w-tick-chart", x: 0, y: 4, w: 6, h: 18, minW: 5, minH: 10 },
        { i: "w-tick-summary", x: 6, y: 4, w: 6, h: 18, minW: 3, minH: 10 },
      ],
    }),
    [],
  );

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
        {/* Filters — always visible */}
        <div key="w-filters" className="h-full w-full">
          <DashboardFilters />
        </div>

        {/* Tick At-Price Chart */}
        {visibleWidgets["w-tick-chart"] !== false && (
          <div key="w-tick-chart" className="h-full w-full">
            <TickAtPriceChart />
          </div>
        )}

        {/* Tick Summary */}
        {visibleWidgets["w-tick-summary"] !== false && (
          <div key="w-tick-summary" className="h-full w-full">
            <TickAtPriceSummary />
          </div>
        )}
      </ResponsiveGrid>
    </div>
  );
}
