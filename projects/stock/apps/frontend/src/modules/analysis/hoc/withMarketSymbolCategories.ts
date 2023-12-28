import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import type { MarketSymbolCategory } from '@modules/analysis/types';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension';
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

  const selectFakeMarketCatWithCurrentSymbol = useCallback(() => {
    dispatch(ANALYSIS_ACTIONS.selectFakeMarketCatWithCurrentSymbol());
  }, []);

  return {
    state: { marketCategories, selectedMarketCat },
    actions: {
      saveMarketCat,
      selectMarketCat,
      selectFakeMarketCatWithCurrentSymbol,
    },
  };
});
