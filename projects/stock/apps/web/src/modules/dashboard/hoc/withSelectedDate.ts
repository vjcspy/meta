import { createHOC } from "@web/ui-extension";
import { useCallback, useState } from "react";

export const withSelectedDate = createHOC(() => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const selectedDateStr = selectedDate ? selectedDate.toISOString().slice(0, 10) : null;

  const clearSelectedDate = useCallback(() => setSelectedDate(undefined), []);

  return {
    state: { selectedDate, selectedDateStr },
    actions: { setSelectedDate, clearSelectedDate },
  };
}, "withSelectedDate");
