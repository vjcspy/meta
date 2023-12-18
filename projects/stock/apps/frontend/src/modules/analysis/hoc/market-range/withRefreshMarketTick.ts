import { refreshTickRequest$ } from '@modules/analysis/hoc/withRefreshTick';
import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { MarketTicks } from '@modules/analysis/util/ticks/market-ticks';
import { CommonValue } from '@modules/analysis/value/common.value';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { isTradingTime } from '@stock/packages-com/dist/util/isTradingTime';
import { createUiHOC } from '@web/ui-extension/dist';
import { forEach } from 'lodash-es';
import { useEffect } from 'react';

export default createUiHOC(() => {
  const selectedMarketCat = useSelectFromState(
    (state) => state.analysis.selectedMarketCat,
  );

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

  return {};
});
