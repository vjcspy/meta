import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withTicks = createUiHOC(() => {
  const dispatch = useAppDispatch();
  const symbol = useSelectFromState((state) => state.analysis.symbol);
  const toDate = useSelectFromState((state) => state.analysis.toDate);
  const fromDate = useSelectFromState((state) => state.analysis.fromDate);

  useEffect(() => {
    dispatch(ANALYSIS_ACTIONS.loadTicks());
  }, [symbol, fromDate, toDate]);

  return {
    state: {},
  };
}, 'withTicks');
