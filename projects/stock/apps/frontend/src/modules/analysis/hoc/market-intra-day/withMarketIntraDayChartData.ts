import type { MarketIntraDayChartData } from '@modules/analysis/util/ticks/market-intra-day';
import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import { createUiHOC } from '@web/ui-extension/dist';
import { useEffect, useState } from 'react';

export default createUiHOC(() => {
  const [chartData, setChartData] = useState<MarketIntraDayChartData>();

  useEffect(() => {
    const subscriber = MarketIntraDay.getResolvedTickChartObserver().subscribe(
      () => {
        if (MarketIntraDay.isResolveIntraDayChartData.isResolved) {
          setChartData(MarketIntraDay.marketIntraDayChartData);
        }
      },
    );

    return () => {
      subscriber.unsubscribe();
    };
  }, []);

  return {
    state: {
      chartData,
    },
  };
});
