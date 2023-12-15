'use client';

import AnalysisSymbolTable from '@modules/analysis/components/AnalysisSymbolTable';
import MarketSymbolCategories from '@modules/analysis/components/MarketSymbolCategories';
import MarketTickIntraDay from '@modules/analysis/components/MarketTickIntraDay';
import MarketTickRangeChart from '@modules/analysis/components/MarketTickRange/MarketTickRangeChart';
import MarketTickRangeConfig from '@modules/analysis/components/MarketTickRange/MarketTickRangeConfig';
import { combineHOC } from '@web/ui-extension';

export default combineHOC()(() => {
  return (
    <>
      <MarketSymbolCategories />
      <AnalysisSymbolTable adjustMarketCat={true} />
      <MarketTickIntraDay />
      <MarketTickRangeConfig />
      <MarketTickRangeChart />
    </>
  );
});
