import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension/dist';
import { useEffect } from 'react';

export default createUiHOC(() => {
  const dispatch = useAppDispatch();
  const symbol = useSelectFromState(
    (state) => state.analysis.intraDaySpeedSymbol,
  );
  const intraDaySpeedData = useSelectFromState(
    (state) => state.analysis.intraDaySpeedData,
  );
  const date = useSelectFromState((state) => state.analysis.toDate);

  useEffect(() => {
    dispatch(ANALYSIS_ACTIONS.loadIntraDaySpeed());
  }, [symbol, date]);

  return {
    state: {
      symbol,
      intraDaySpeedData,
    },
  };
});
