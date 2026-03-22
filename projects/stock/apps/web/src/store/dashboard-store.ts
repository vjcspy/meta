import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RANGE_DAYS = 90;

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return formatDate(d);
}

function daysBetween(from: string, to: string): number {
  const diff =
    new Date(to).getTime() - new Date(from).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

// --- Types ---

type DashboardState = {
  symbol: string;
  fromDate: string;
  toDate: string;
  tradeValueFilter: number;
  visibleWidgets: Record<string, boolean>;
};

type DashboardActions = {
  setSymbol: (symbol: string) => void;
  setFromDate: (from: string) => void;
  setToDate: (to: string) => void;
  setTradeValueFilter: (value: number) => void;
  toggleWidget: (widgetId: string) => void;
  isDateRangeValid: () => boolean;
};

type DashboardStore = DashboardState & DashboardActions;

// --- Store ---

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      // State
      symbol: "HRC",
      fromDate: daysAgo(30),
      toDate: formatDate(new Date()),
      tradeValueFilter: 250,
      visibleWidgets: {
        "w-tick-chart": true,
        "w-tick-summary": true,
      },

      // Actions
      setSymbol: (symbol) => set({ symbol }),
      setFromDate: (fromDate) => set({ fromDate }),
      setToDate: (toDate) => set({ toDate }),
      setTradeValueFilter: (tradeValueFilter) => set({ tradeValueFilter }),
      toggleWidget: (widgetId) =>
        set((state) => ({
          visibleWidgets: {
            ...state.visibleWidgets,
            [widgetId]: !state.visibleWidgets[widgetId],
          },
        })),
      isDateRangeValid: () => {
        const { fromDate, toDate } = get();
        return fromDate <= toDate && daysBetween(fromDate, toDate) <= MAX_RANGE_DAYS;
      },
    }),
    { name: "dashboard-state" },
  ),
);
