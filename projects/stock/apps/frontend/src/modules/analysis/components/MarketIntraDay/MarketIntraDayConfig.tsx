'use client';

import MarketTickCategorySelect from '@modules/analysis/components/MarketTickRange/MarketTickCategorySelect';
import TimeRes from '@modules/analysis/components/TimeRes';
import ToDate from '@modules/analysis/components/ToDate';
import TradeValueFilter from '@modules/analysis/components/TradeValueFilter';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';

export default combineHOC()(() => {
  return (
    <>
      <Row title={`Market Intra-day Configuration`} oneCol={false}>
        <div className="custom-select grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-4">
          <MarketTickCategorySelect />
          <div className="custom-select grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
            <ToDate />
            <TimeRes />
          </div>
          <TradeValueFilter />
        </div>
      </Row>
    </>
  );
});
