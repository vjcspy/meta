import { ANALYSIS_ACTIONS } from '@src/modules/analysis/store/analysis.actions';
import type { IRootState } from '@src/store';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { SYMBOL_CACHE_KEY } from '@src/value/analysis.value';
import { useSelector } from '@stock/packages-redux';
import { createUiHOC } from '@web/ui-extension';
import { useCallback, useEffect } from 'react';

export const withSelectedSymbol = createUiHOC(() => {
  const symbol = useSelector((state: IRootState) => state.analysis.symbol);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!symbol) {
      const _symbol = localStorage.getItem(SYMBOL_CACHE_KEY);
      if (_symbol) {
        dispatch(
          ANALYSIS_ACTIONS.setSymbol({
            symbol: _symbol,
          }),
        );
      }
    }
  }, [symbol]);

  const selectSymbol = useCallback((symbol: string) => {
    dispatch(
      ANALYSIS_ACTIONS.setSymbol({
        symbol,
      }),
    );
  }, []);

  return {
    state: {
      symbol,
    },
    actions: {
      selectSymbol,
    },
  };
}, 'withSelectedCor');
