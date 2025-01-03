'use client';
import MarketIntraDayAnalyzeTable from '@modules/analysis/components/MarketIntraDaySpike/MarketIntraDayAnalyzeTable';
import MarketIntraDayChart from '@modules/analysis/components/MarketIntraDaySpike/MarketIntraDayChart';
import MarketIntraDayConfig from '@modules/analysis/components/MarketIntraDaySpike/MarketIntraDayConfig';
import withRefreshMarketIntraDayTick from '@modules/analysis/hoc/market-intra-day/withRefreshMarketIntraDayTick';
import withTriggerLoadMarketIntraDayTicks from '@modules/analysis/hoc/market-intra-day/withTriggerLoadMarketIntraDayTicks';
import withRefreshMarketTick from '@modules/analysis/hoc/market-range/withRefreshMarketTick';
import AntdConfigProvider from '@src/components/AntdConfigProvider';
import { combineHOC } from '@web/ui-extension/dist';

export default combineHOC(
  withTriggerLoadMarketIntraDayTicks,
  withRefreshMarketTick,
  withRefreshMarketIntraDayTick,
)(() => {
  return (
    <>
      <AntdConfigProvider>
        <MarketIntraDayConfig />
        <MarketIntraDayChart />
        <MarketIntraDayAnalyzeTable />
      </AntdConfigProvider>
    </>
  );
});
