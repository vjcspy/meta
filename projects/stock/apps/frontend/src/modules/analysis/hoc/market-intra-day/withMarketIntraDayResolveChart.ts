import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import { useSelectFromState } from '@src/store/selectFromState';
import { createUiHOC } from '@web/ui-extension/dist';
import { isNumber, isString } from 'lodash-es';
import { useEffect, useState } from 'react';

export default createUiHOC(() => {
  const selectedMarketCat = useSelectFromState(
    (state) => state.analysis.selectedMarketCat,
  );
  const date = useSelectFromState((state) => state.analysis.toDate);
  const tradeValue = useSelectFromState(
    (state) => state.analysis.tradeValueFilter,
  );
  const timeRes = useSelectFromState((state) => state.analysis.timeRes);

  const [loadTicksInfo, setLoadTicksInfo] = useState<{
    isFull: boolean;
    notLoaded: number;
  }>();

  useEffect(() => {
    if (selectedMarketCat?.symbols?.length > 0) {
      const sub = MarketIntraDay.getLoadedTickObserver().subscribe(() => {
        setLoadTicksInfo(
          MarketIntraDay.isLoadedFullTicks(selectedMarketCat.symbols),
        );
      });

      return () => {
        sub.unsubscribe();
      };
    }
  }, [selectedMarketCat]);

  useEffect(() => {
    const sub = MarketIntraDay.getLoadedTickObserver().subscribe(() => {
      if (
        tradeValue?.length === 3 &&
        isString(date) &&
        isNumber(timeRes) &&
        Array.isArray(selectedMarketCat?.symbols) &&
        selectedMarketCat.symbols.length > 0
      ) {
        MarketIntraDay.triggerResolveChartData(
          tradeValue[1],
          timeRes,
          selectedMarketCat.symbols,
        );
      }
    });

    return () => {
      sub.unsubscribe();
    };
  }, [tradeValue, timeRes, selectedMarketCat?.symbols]);

  return { state: { loadTicksInfo } };
});
