"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";

import DashboardFilters from "./components/DashboardFilters";
import type { WidgetDef } from "./values/widget-registry";
import { WIDGET_REGISTRY } from "./values/widget-registry";

const TickAtPriceChart = dynamic(
  () => import("@/modules/dashboard/components/widgets/tick-at-price/TickAtPriceChart"),
  { ssr: false },
);

const TickAtPriceSummary = dynamic(
  () => import("@/modules/dashboard/components/widgets/tick-at-price/TickAtPriceSummary"),
  { ssr: false },
);

const MarketRangeTable = dynamic(
  () => import("@/modules/dashboard/components/widgets/market-range/MarketTickRangeTable"),
  {
    ssr: false,
  },
);

const MarketRangeChart = dynamic(() => import("@/modules/dashboard/components/widgets/market-range/MarketRangeChart"), {
  ssr: false,
});

const AnalysisSymbolTable = dynamic(
  () => import("@/modules/dashboard/components/widgets/analysis-table/AnalysisSymbolTable"),
  { ssr: false },
);

const ResponsiveGrid: any = dynamic(
  async () => {
    // @ts-expect-error: Dynamic import
    const mod = await import("react-grid-layout");
    return mod.WidthProvider(mod.Responsive);
  },
  { ssr: false },
);

const WIDGET_RENDERERS: Record<string, () => React.ReactNode> = {
  "w-tick-chart": () => <TickAtPriceChart />,
  "w-tick-summary": () => <TickAtPriceSummary />,
  "w-market-range-table": () => <MarketRangeTable />,
  "w-market-range-chart": () => <MarketRangeChart />,
  "w-analysis-table": () => <AnalysisSymbolTable />,
};

const FILTERS_LAYOUT = {
  i: "w-filters",
  x: 0,
  y: 0,
  w: 12,
  h: 4,
  minW: 6,
  minH: 3,
  static: true,
};

export default function DashboardPage() {
  const visibleWidgets = useDashboardModuleStore((s) => s.visibleWidgets);

  const layoutKey = useMemo(() => JSON.stringify(visibleWidgets), [visibleWidgets]);

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const { layouts, visibleDefs } = useMemo(() => {
    const items = [FILTERS_LAYOUT];
    const defs: WidgetDef[] = [];
    let cursorX = 0;
    let cursorY = FILTERS_LAYOUT.h;

    for (const def of WIDGET_REGISTRY) {
      if (visibleWidgets[def.id] === false) continue;
      const { w, h, minW, minH } = def.defaultLayout;

      if (cursorX + w > 12) {
        cursorX = 0;
        cursorY += h;
      }

      items.push({
        i: def.id,
        x: cursorX,
        y: cursorY,
        w,
        h,
        minW,
        minH,
        static: false,
      });
      defs.push(def);
      cursorX += w;
    }

    return { layouts: { lg: items }, visibleDefs: defs };
  }, [visibleWidgets]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-background">
      <ResponsiveGrid
        key={layoutKey}
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
        <div key="w-filters" className="h-full w-full">
          <DashboardFilters />
        </div>

        {visibleDefs.map((def) => (
          <div key={def.id} className="h-full w-full">
            {WIDGET_RENDERERS[def.id]?.()}
          </div>
        ))}
      </ResponsiveGrid>
    </div>
  );
}
