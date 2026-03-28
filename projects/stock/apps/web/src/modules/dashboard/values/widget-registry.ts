export type WidgetDef = {
  id: string;
  label: string;
  defaultLayout: { w: number; h: number; minW: number; minH: number };
};

export const WIDGET_REGISTRY: WidgetDef[] = [
  {
    id: "w-tick-chart",
    label: "Tick At-Price Chart",
    defaultLayout: { w: 6, h: 18, minW: 5, minH: 10 },
  },
  {
    id: "w-tick-summary",
    label: "Tick Summary",
    defaultLayout: { w: 6, h: 18, minW: 3, minH: 10 },
  },
  {
    id: "w-market-range-table",
    label: "Market Range Table",
    defaultLayout: { w: 12, h: 14, minW: 8, minH: 10 },
  },
  {
    id: "w-market-range-chart",
    label: "Market Range Chart",
    defaultLayout: { w: 12, h: 16, minW: 8, minH: 10 },
  },
  {
    id: "w-analysis-table",
    label: "Analysis Symbol Table",
    defaultLayout: { w: 12, h: 14, minW: 8, minH: 10 },
  },
];
