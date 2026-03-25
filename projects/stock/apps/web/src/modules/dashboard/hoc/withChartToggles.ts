import { createHOC } from "@web/ui-extension";
import { useCallback, useState } from "react";

export const withChartToggles = createHOC(() => {
  const [showSumSheep, setShowSumSheep] = useState(true);
  const [showSumShark, setShowSumShark] = useState(false);
  const [showSheep, setShowSheep] = useState(false);
  const [showShark, setShowShark] = useState(false);

  return {
    state: { showSumSheep, showSumShark, showSheep, showShark },
    actions: {
      setShowSumSheep: useCallback((v: boolean) => setShowSumSheep(v), []),
      setShowSumShark: useCallback((v: boolean) => setShowSumShark(v), []),
      setShowSheep: useCallback((v: boolean) => setShowSheep(v), []),
      setShowShark: useCallback((v: boolean) => setShowShark(v), []),
    },
  };
}, "withChartToggles");
