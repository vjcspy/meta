'use client';

import AnalysisSymbolTable from '@modules/analysis/components/AnalysisSymbolTable';
import MarketSymbolCategories from '@modules/analysis/components/MarketSymbolCategories';
import MarketTickIntraDayTable from '@modules/analysis/components/MarketTickIntraDayTable';
import MarketTickRangeChart from '@modules/analysis/components/MarketTickRange/MarketTickRangeChart';
import MarketTickRangeConfig from '@modules/analysis/components/MarketTickRange/MarketTickRangeConfig';
import { combineHOC } from '@web/ui-extension';

export default combineHOC()(() => {
  return (
    <>
      <MarketSymbolCategories />
      <AnalysisSymbolTable adjustMarketCat={true} />
      <MarketTickRangeConfig />
      <MarketTickIntraDayTable />
      <MarketTickRangeChart />
    </>
  );
});
