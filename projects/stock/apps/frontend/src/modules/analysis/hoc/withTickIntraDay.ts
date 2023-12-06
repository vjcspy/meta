import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withTickIntraDay = createUiHOC(() => {
  const dispatch = useAppDispatch();
  const symbol = useSelectFromState((state) => state.analysis.symbol);
  const toDate = useSelectFromState((state) => state.analysis.toDate);

  useEffect(() => {
    dispatch(
      ANALYSIS_ACTIONS.loadTickIntraDay({
        toDate,
      }),
    );
  }, [symbol, toDate]);

  const tickIntraDay = useSelectFromState(
    (state) => state.analysis.tickIntraDay,
  );

  return {
    state: {
      tickIntraDay,
    },
  };
}, 'withTickIntraDay');
