import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import { message } from '@modules/app/util/message';
import { useSelectFromState } from '@src/store/selectFromState';
import { createUiHOC } from '@web/ui-extension/dist';
import { useEffect, useState } from 'react';

export default createUiHOC(() => {
  const selectedMarketCat = useSelectFromState(
    (state) => state.analysis.selectedMarketCat,
  );
  // const [
  //   resolveMarketIntraDayChartStatus,
  //   setResolveMarketIntraDayChartStatus,
  // ] = useState<ResolveTickChartStatus>();
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
      message().success({ content: 'All symbols has loaded successfully' });
      // calTickIntraDayData(MarketIntraDay.ticks);
    }
  }, [isLoadedFullTicks]);

  // useEffect(() => {
  //   if (selectedMarketCat?.symbols?.length > 0) {
  //     const sub = MarketIntraDay.getResolvedTickChartObserver().subscribe(
  //       () => {
  //         setResolveMarketIntraDayChartStatus(
  //           MarketIntraDay.getResolveTickChartStatus(selectedMarketCat.symbols),
  //         );
  //       },
  //     );
  //
  //     return () => {
  //       sub.unsubscribe();
  //     };
  //   }
  // }, [selectedMarketCat]);
  //
  // useEffect(() => {
  //   if (resolveMarketIntraDayChartStatus?.isFinish === true) {
  //     message().success({ content: 'All symbols has loaded successfully' });
  //   }
  // }, [resolveMarketIntraDayChartStatus?.isFinish]);

  return { state: { isLoadedFullTicks } };
});
