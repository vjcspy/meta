import dynamic from "next/dynamic";
import type React from "react";
import { useMemo } from "react";
// RGL needs window, so we disable SSR via dynamic import
const ResponsiveGrid: any = dynamic(
  async () => {
    // @ts-expect-error: Dynamic import
    const mod = await import("react-grid-layout");
    return mod.WidthProvider(mod.Responsive);
  },
  { ssr: false },
);

// Attempt to use Card from shadcn if available; fallback to a simple div container
let Card: React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>;
let CardHeader: React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>;
let CardContent: React.FC<
  {
    children: React.ReactNode;
    className?: string;
  } & React.HTMLAttributes<HTMLDivElement>
>;
try {
  const c = require("@/components/ui/card");
  Card = c.Card;
  CardHeader = c.CardHeader;
  CardContent = c.CardContent;
} catch (_e) {
  Card = ({ children, className = "", ...props }) => (
    <div
      className={`rounded border bg-background text-foreground shadow ${className}`}
      {...props}
    >
      {children}
    </div>
  );
  CardHeader = ({ children, className = "", ...props }) => (
    <div className={`border-b p-3 font-medium ${className}`} {...props}>
      {children}
    </div>
  );
  CardContent = ({ children, className = "", ...props }) => (
    <div className={`p-3 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default function DashboardPage() {
  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  const layouts = useMemo(
    () => ({
      lg: [
        { i: "w1", x: 0, y: 0, w: 4, h: 8, minW: 3, minH: 4 },
        { i: "w2", x: 4, y: 0, w: 4, h: 8, minW: 3, minH: 4 },
        { i: "w3", x: 8, y: 0, w: 4, h: 8, minW: 3, minH: 4 },
      ],
    }),
    [],
  );

  return (
    <div className="h-screen w-screen overflow-hidden bg-background">
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
      >
        <div key="w1" className="h-full w-full">
          <Card className="flex h-full w-full flex-col overflow-hidden">
            <CardHeader className="rgl-drag-handle cursor-move select-none">
              Widget 1
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Chart/Table placeholder
              </div>
            </CardContent>
          </Card>
        </div>
        <div key="w2" className="h-full w-full">
          <Card className="flex h-full w-full flex-col overflow-hidden">
            <CardHeader className="rgl-drag-handle cursor-move select-none">
              Widget 2
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Chart/Table placeholder
              </div>
            </CardContent>
          </Card>
        </div>
        <div key="w3" className="h-full w-full">
          <Card className="flex h-full w-full flex-col overflow-hidden">
            <CardHeader className="rgl-drag-handle cursor-move select-none">
              Widget 3
            </CardHeader>
            <CardContent className="flex-1 overflow-auto">
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                Chart/Table placeholder
              </div>
            </CardContent>
          </Card>
        </div>
      </ResponsiveGrid>
    </div>
  );
}
