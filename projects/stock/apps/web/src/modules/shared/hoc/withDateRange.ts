import { createHOC } from "@web/ui-extension";

import { useGlobalStore } from "@/modules/shared/store/global-store";

export const withDateRange = createHOC(() => {
  const fromDate = useGlobalStore((s) => s.fromDate);
  const toDate = useGlobalStore((s) => s.toDate);
  const setFromDate = useGlobalStore((s) => s.setFromDate);
  const setToDate = useGlobalStore((s) => s.setToDate);
  const isDateRangeValid = useGlobalStore((s) => s.isDateRangeValid());

  return {
    state: { fromDate, toDate, isDateRangeValid },
    actions: { setFromDate, setToDate },
  };
}, "withDateRange");
