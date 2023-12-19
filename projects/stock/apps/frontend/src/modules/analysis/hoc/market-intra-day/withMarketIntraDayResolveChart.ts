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

  const [isLoadedFullTicks, setLoadedFullTicks] = useState(false);

  useEffect(() => {
    if (selectedMarketCat?.symbols?.length > 0) {
      const sub = MarketIntraDay.getLoadedTickObserver().subscribe(() => {
        setLoadedFullTicks(
          MarketIntraDay.isLoadedFullTicks(selectedMarketCat.symbols),
        );
      });

      return () => {
        sub.unsubscribe();
      };
    }
  }, [selectedMarketCat]);

  useEffect(() => {
    if (isLoadedFullTicks) {
      if (
        tradeValue?.length === 3 &&
        isString(date) &&
        isNumber(timeRes) &&
        Array.isArray(selectedMarketCat?.symbols) &&
        selectedMarketCat.symbols.length > 0
      ) {
        MarketIntraDay.triggerResolveChartData(
          date,
          tradeValue[1],
          timeRes,
          selectedMarketCat.symbols,
        );
      }
    }
  }, [
    isLoadedFullTicks,
    date,
    tradeValue,
    timeRes,
    selectedMarketCat?.symbols,
  ]);

  return { state: { isLoadedFullTicks } };
});
