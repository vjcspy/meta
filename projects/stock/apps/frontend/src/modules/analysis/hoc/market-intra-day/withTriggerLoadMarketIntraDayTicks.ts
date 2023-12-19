import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension/dist';
import { useEffect } from 'react';

export default createUiHOC(() => {
  const dispatch = useAppDispatch();
  const date = useSelectFromState((state) => state.analysis.toDate);
  const selectedMarketCat = useSelectFromState(
    (state) => state.analysis.selectedMarketCat,
  );

  useEffect(() => {
    MarketIntraDay.getLoadedTickObserver().next(undefined);
    dispatch(ANALYSIS_ACTIONS.loadMarketIntraDayTicks());
  }, [date, selectedMarketCat]);

  return {};
});
