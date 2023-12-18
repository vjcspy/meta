'use client';

import MarketTickCategorySelect from '@modules/analysis/components/MarketTickRange/MarketTickCategorySelect';
import ToDate from '@modules/analysis/components/ToDate';
import withMarketIntraDayResolveChartStatus from '@modules/analysis/hoc/market-intra-day/withMarketIntraDayResolveChartStatus';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';

export default combineHOC(withMarketIntraDayResolveChartStatus)((props) => {
  return (
    <>
      <Row title={`Market Intra-day Configuration`} oneCol={false}>
        <div className="custom-select grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-4">
          <MarketTickCategorySelect />
          <ToDate />
        </div>
      </Row>
    </>
  );
});
