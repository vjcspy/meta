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
  const diff = new Date(to).getTime() - new Date(from).getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

type GlobalState = {
  symbol: string;
  fromDate: string;
  toDate: string;
  tradeValueFilter: number;
};

type GlobalActions = {
  setSymbol: (symbol: string) => void;
  setFromDate: (from: string) => void;
  setToDate: (to: string) => void;
  setTradeValueFilter: (value: number) => void;
  isDateRangeValid: () => boolean;
};

export type GlobalStore = GlobalState & GlobalActions;

export const useGlobalStore = create<GlobalStore>()(
  persist(
    (set, get) => ({
      symbol: "HRC",
      fromDate: daysAgo(30),
      toDate: formatDate(new Date()),
      tradeValueFilter: 250,

      setSymbol: (symbol) => set({ symbol }),
      setFromDate: (fromDate) => set({ fromDate }),
      setToDate: (toDate) => set({ toDate }),
      setTradeValueFilter: (tradeValueFilter) => set({ tradeValueFilter }),
      isDateRangeValid: () => {
        const { fromDate, toDate } = get();
        return fromDate <= toDate && daysBetween(fromDate, toDate) <= MAX_RANGE_DAYS;
      },
    }),
    { name: "global-state" },
  ),
);
