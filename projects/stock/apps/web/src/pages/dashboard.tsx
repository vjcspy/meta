import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

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

// ---- Widget registry ----

type WidgetDef = {
  id: string;
  defaultLayout: { w: number; h: number; minW: number; minH: number };
  render: () => React.ReactNode;
};

const WIDGET_REGISTRY: WidgetDef[] = [
  {
    id: "w-tick-chart",
    defaultLayout: { w: 6, h: 18, minW: 5, minH: 10 },
    render: () => <TickAtPriceChart />,
  },
  {
    id: "w-tick-summary",
    defaultLayout: { w: 6, h: 18, minW: 3, minH: 10 },
    render: () => <TickAtPriceSummary />,
  },
];

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
  const visibleWidgets = useDashboardStore((s) => s.visibleWidgets);

  // Increment key when visibility changes to force RGL re-mount with fresh layout
  const layoutKeyRef = useRef(0);
  const prevVisibleRef = useRef(visibleWidgets);
  if (prevVisibleRef.current !== visibleWidgets) {
    prevVisibleRef.current = visibleWidgets;
    layoutKeyRef.current += 1;
  }

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  // Build layout dynamically — visible widgets get default size, placed below filters
  const { layouts, visibleDefs } = useMemo(() => {
    const items = [FILTERS_LAYOUT];
    const defs: WidgetDef[] = [];
    let cursorX = 0;
    let cursorY = FILTERS_LAYOUT.h; // start below filters

    for (const def of WIDGET_REGISTRY) {
      if (visibleWidgets[def.id] === false) continue;
      const { w, h, minW, minH } = def.defaultLayout;

      // Wrap to next row if it doesn't fit
      if (cursorX + w > 12) {
        cursorX = 0;
        cursorY += h;
      }

      items.push({ i: def.id, x: cursorX, y: cursorY, w, h, minW, minH });
      defs.push(def);
      cursorX += w;
    }

    return { layouts: { lg: items }, visibleDefs: defs };
  }, [visibleWidgets]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden overflow-y-auto bg-background">
      <ResponsiveGrid
        key={layoutKeyRef.current}
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

        {/* Dynamic widgets */}
        {visibleDefs.map((def) => (
          <div key={def.id} className="h-full w-full">
            {def.render()}
          </div>
        ))}
      </ResponsiveGrid>
    </div>
  );
}

