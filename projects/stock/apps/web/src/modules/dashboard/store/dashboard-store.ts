import { create } from "zustand";
import { persist } from "zustand/middleware";

type DashboardModuleState = {
  visibleWidgets: Record<string, boolean>;
  selectedCategoryKey: string | null;
};

type DashboardModuleActions = {
  toggleWidget: (widgetId: string) => void;
  setSelectedCategoryKey: (key: string | null) => void;
};

export type DashboardModuleStore = DashboardModuleState &
  DashboardModuleActions;

export const useDashboardModuleStore = create<DashboardModuleStore>()(
  persist(
    (set) => ({
      visibleWidgets: {
        "w-tick-chart": true,
        "w-tick-summary": true,
        "w-market-range-table": true,
        "w-market-range-chart": true,
      },
      selectedCategoryKey: null,

      toggleWidget: (widgetId) =>
        set((state) => ({
          visibleWidgets: {
            ...state.visibleWidgets,
            [widgetId]: !state.visibleWidgets[widgetId],
          },
        })),
      setSelectedCategoryKey: (selectedCategoryKey) =>
        set({ selectedCategoryKey }),
    }),
    { name: "dashboard-state" },
  ),
);
