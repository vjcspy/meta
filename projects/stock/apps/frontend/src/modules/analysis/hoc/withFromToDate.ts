import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

export const withFromToDate = createUiHOC(() => {
  const dispatch = useAppDispatch();
  const fromDate = useSelectFromState((state) => state.analysis.fromDate);
  const toDate = useSelectFromState((state) => state.analysis.toDate);
  const setFromDate = useCallback((fromDate: string) => {
    dispatch(
      ANALYSIS_ACTIONS.setFromDate({
        fromDate,
      }),
    );
  }, []);

  const setToDate = useCallback((toDate: string) => {
    dispatch(
      ANALYSIS_ACTIONS.setToDate({
        toDate,
      }),
    );
  }, []);

  return {
    state: { fromDate, toDate },
    actions: { setFromDate, setToDate },
  };
}, 'withFromDate');
