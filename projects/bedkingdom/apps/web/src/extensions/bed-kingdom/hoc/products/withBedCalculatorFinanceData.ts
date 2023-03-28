import { setCalculatorFinance } from '@extensions/bed-kingdom/store/content/content.content.actions';
import { selectCalculatorFinance } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { useDispatch, useSelector } from '@main/packages-web-redux';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

export const withBedCalculatorFinanceData = createUiHOC(() => {
  const dispatch = useDispatch();
  const calculatorFinance = useSelector(selectCalculatorFinance);
  const setCalculatorFinanceActions = useCallback((value: any) => {
    dispatch(setCalculatorFinance({ value }));
  }, []);
  return {
    state: {
      calculatorFinance,
    },
    actions: { setCalculatorFinanceActions },
  };
}, 'withBedCalculatorFinanceData');
