import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

export const withTradeValueFilter = createUiHOC(() => {
  const dispatch = useAppDispatch();
  const tradeValueFilter = useSelectFromState(
    (state) => state.analysis.tradeValueFilter,
  );

  const setTradeValueFilterAction = useCallback(
    (tradeValueFilter: number[]) => {
      dispatch(
        ANALYSIS_ACTIONS.setTradeValueFilter({
          tradeValueFilter,
        }),
      );
    },
    [],
  );

  return {
    state: { tradeValueFilter },
    actions: { setTradeValueFilterAction },
  };
}, 'withTradeValueFilter');
