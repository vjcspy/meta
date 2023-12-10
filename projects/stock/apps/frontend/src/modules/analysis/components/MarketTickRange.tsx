'use client';

import AnalysisSymbolTable from '@modules/analysis/components/AnalysisSymbolTable';
import MarketSymbolCategories from '@modules/analysis/components/MarketSymbolCategories';
import withMarketTickData from '@modules/analysis/hoc/withMarketTickData';
import { combineHOC } from '@web/ui-extension';

export default combineHOC(withMarketTickData)(() => {
  return (
    <>
      <MarketSymbolCategories />
      <AnalysisSymbolTable adjustMarketCat={true} />
    </>
  );
});
