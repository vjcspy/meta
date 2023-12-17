'use client';
import MarketIntraDayConfig from '@modules/analysis/components/MarketIntraDay/MarketIntraDayConfig';
import withTriggerLoadMarketIntraDayTicks from '@modules/analysis/hoc/market-intra-day/withTriggerLoadMarketIntraDayTicks';
import AntdConfigProvider from '@src/components/AntdConfigProvider';
import { combineHOC } from '@web/ui-extension/dist';

export default combineHOC(withTriggerLoadMarketIntraDayTicks)(() => {
  return (
    <>
      <AntdConfigProvider>
        <MarketIntraDayConfig />
      </AntdConfigProvider>
    </>
  );
});
