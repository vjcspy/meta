import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension';
import { debounce } from 'lodash-es';
import { useCallback, useMemo } from 'react';

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
  const debounceUpdateTradeValue = useMemo(() => {
    return debounce((data: any) => {
      setTradeValueFilterAction(data);
    }, 1000);
  }, [setTradeValueFilterAction]);

  return {
    state: { tradeValueFilter },
    actions: { setTradeValueFilterAction, debounceUpdateTradeValue },
  };
}, 'withTradeValueFilter');
