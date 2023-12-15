import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension/dist';
import { useCallback, useEffect } from 'react';

export default createUiHOC(() => {
  const dispatch = useAppDispatch();
  const marketFromDate = useSelectFromState(
    (state) => state.analysis.marketFromDate,
  );
  const marketToDate = useSelectFromState(
    (state) => state.analysis.marketToDate,
  );

  const setMarketFromDate = useCallback((fromDate: string) => {
    dispatch(ANALYSIS_ACTIONS.setMarketFromDate({ fromDate }));
  }, []);

  const setMarketToDate = useCallback((toDate: string) => {
    dispatch(ANALYSIS_ACTIONS.setMarketToDate({ toDate }));
  }, []);

  useEffect(() => {
    dispatch(ANALYSIS_ACTIONS.loadMarketTicks());
  }, [marketFromDate, marketToDate]);

  return {
    state: {
      marketFromDate,
      marketToDate,
    },
    actions: {
      setMarketFromDate,
      setMarketToDate,
    },
  };
});
