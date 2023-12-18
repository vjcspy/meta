import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { MarketTicks } from '@modules/analysis/util/ticks/market-ticks';
import { CommonValue } from '@modules/analysis/value/common.value';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { isTradingTime } from '@stock/packages-com/dist/util/isTradingTime';
import { createUiHOC } from '@web/ui-extension/dist';
import { useEffect } from 'react';

export default createUiHOC(() => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isTradingTime()) {
      const i = setInterval(() => {
        // console.log('re-fetch market ticks data................');
        MarketTicks.resetTicksData();
        dispatch(ANALYSIS_ACTIONS.loadMarketTicks());
      }, CommonValue.RE_FETCH_TICKS_WINDOW_TIME);

      return () => {
        clearInterval(i);
      };
    }
  }, []);

  return {};
});
