import { createHOC } from "@web/ui-extension";

import { useDashboardModuleStore } from "@/modules/dashboard/store/dashboard-store";

export const withWidgetVisibility = createHOC(() => {
  const visibleWidgets = useDashboardModuleStore((s) => s.visibleWidgets);
  const toggleWidget = useDashboardModuleStore((s) => s.toggleWidget);

  return {
    state: { visibleWidgets },
    actions: { toggleWidget },
  };
}, "withWidgetVisibility");
