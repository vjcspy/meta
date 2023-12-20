'use client';

import AnalysisSymbolTable from '@modules/analysis/components/AnalysisSymbolTable';
import MarketRangeTable from '@modules/analysis/components/MarketRangeTable';
import MarketTickRangeChart from '@modules/analysis/components/MarketTickRange/MarketTickRangeChart';
import MarketTickRangeConfig from '@modules/analysis/components/MarketTickRange/MarketTickRangeConfig';
import withReFetchMarketTicks from '@modules/analysis/hoc/market-range/withReFetchMarketTicks';
import withRefreshMarketTick from '@modules/analysis/hoc/market-range/withRefreshMarketTick';
import withTriggerLoadMarketTicks from '@modules/analysis/hoc/market-range/withTriggerLoadMarketTicks';
import { withThemState } from '@modules/app/hoc/withThemState';
import AntdConfigProvider from '@src/components/AntdConfigProvider';
import { combineHOC } from '@web/ui-extension';

export default combineHOC(
  withThemState,
  withRefreshMarketTick,
  withTriggerLoadMarketTicks,
  withReFetchMarketTicks,
)(() => {
  return (
    <>
      <AntdConfigProvider>
        <AnalysisSymbolTable adjustMarketCat={true} />
        <MarketRangeTable />
        <MarketTickRangeConfig />
        <MarketTickRangeChart />
      </AntdConfigProvider>
    </>
  );
});
