'use client';
import MarketIntraDayChart from '@modules/analysis/components/MarketIntraDay/MarketIntraDayChart';
import MarketIntraDayConfig from '@modules/analysis/components/MarketIntraDay/MarketIntraDayConfig';
import withMarketIntraDayResolveChart from '@modules/analysis/hoc/market-intra-day/withMarketIntraDayResolveChart';
import withTriggerLoadMarketIntraDayTicks from '@modules/analysis/hoc/market-intra-day/withTriggerLoadMarketIntraDayTicks';
import AntdConfigProvider from '@src/components/AntdConfigProvider';
import { combineHOC } from '@web/ui-extension/dist';

export default combineHOC(
  withTriggerLoadMarketIntraDayTicks,
  withMarketIntraDayResolveChart,
)(() => {
  return (
    <>
      <AntdConfigProvider>
        <MarketIntraDayConfig />
        <MarketIntraDayChart />
      </AntdConfigProvider>
    </>
  );
});
