import type { ResolveTickChartStatus } from '@modules/analysis/util/ticks/market-ticks';
import { MarketTicks } from '@modules/analysis/util/ticks/market-ticks';
import { useSelectFromState } from '@src/store/selectFromState';
import { createUiHOC } from '@web/ui-extension/dist';
import { useEffect, useState } from 'react';

export default createUiHOC(() => {
  const selectedMarketCat = useSelectFromState(
    (state) => state.analysis.selectedMarketCat,
  );
  const [resolveMarketTickChartStatus, setResolveMarketTickChartStatus] =
    useState<ResolveTickChartStatus>();

  useEffect(() => {
    if (selectedMarketCat?.symbols?.length > 0) {
      const sub = MarketTicks.getResolvedTickChartObserver().subscribe(() => {
        setResolveMarketTickChartStatus(
          MarketTicks.getResolveTickChartStatus(selectedMarketCat.symbols),
        );
      });

      return () => {
        sub.unsubscribe();
      };
    }
  }, [selectedMarketCat]);

  return { state: { resolveMarketTickChartStatus } };
});
