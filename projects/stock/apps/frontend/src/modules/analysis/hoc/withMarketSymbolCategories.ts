import { refreshTickRequest$ } from '@modules/analysis/hoc/withRefreshTick';
import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import type { MarketSymbolCategory } from '@modules/analysis/types';
import { CommonValue } from '@modules/analysis/value/common.value';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { isTradingTime } from '@stock/packages-com/dist/util/isTradingTime';
import { createUiHOC } from '@web/ui-extension';
import { forEach } from 'lodash-es';
import { useCallback, useEffect } from 'react';

export default createUiHOC(() => {
  const dispatch = useAppDispatch();
  const marketCategories = useSelectFromState(
    (state) => state.analysis.marketCategories,
  );

  const selectedMarketCat = useSelectFromState(
    (state) => state.analysis.selectedMarketCat,
  );

  const saveMarketCat = useCallback((cat: MarketSymbolCategory) => {
    dispatch(ANALYSIS_ACTIONS.saveMarketCat({ cat }));
  }, []);

  useEffect(() => {
    if (!marketCategories) {
      dispatch(ANALYSIS_ACTIONS.loadMarketCat());
    }
  }, [marketCategories]);

  const selectMarketCat = useCallback((cat: MarketSymbolCategory) => {
    dispatch(ANALYSIS_ACTIONS.selectMarketCat({ cat }));
  }, []);

  // Refresh tick for all symbols in category
  useEffect(() => {
    const i = setInterval(() => {
      forEach(selectedMarketCat?.symbols, (symbol: string) => {
        if (isTradingTime()) {
          if (symbol) {
            refreshTickRequest$.next(symbol);
          }
        }
      });

      return () => {
        clearInterval(i);
      };
    }, CommonValue.REFRESH_WINDOW_TIME);
  }, [selectedMarketCat]);

  return {
    state: { marketCategories, selectedMarketCat },
    actions: {
      saveMarketCat,
      selectMarketCat,
    },
  };
});
