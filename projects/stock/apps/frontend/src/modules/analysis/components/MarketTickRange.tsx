'use client';

import AnalysisSymbolTable from '@modules/analysis/components/AnalysisSymbolTable';
import MarketSymbolCategories from '@modules/analysis/components/MarketSymbolCategories';
import { combineHOC } from '@web/ui-extension';

export default combineHOC()(() => {
  return (
    <>
      <MarketSymbolCategories />
      <AnalysisSymbolTable adjustMarketCat={true} />
    </>
  );
});
