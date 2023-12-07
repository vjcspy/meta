import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withPrices = createUiHOC(() => {
  const dispatch = useAppDispatch();
  const symbol = useSelectFromState((state) => state.analysis.symbol);
  const toDate = useSelectFromState((state) => state.analysis.toDate);
  const fromDate = useSelectFromState((state) => state.analysis.fromDate);
  const prices = useSelectFromState((state) => state.analysis.prices);

  useEffect(() => {
    dispatch(ANALYSIS_ACTIONS.loadPrices());
  }, [symbol, fromDate, toDate]);

  return {
    state: { prices },
  };
}, 'withPrices');
