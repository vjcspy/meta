'use client';

import { withTicks } from '@modules/analysis/hoc/withTicks';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { combineHOC } from '@web/ui-extension';

import TicksSupplyDemandLineChart from './TickRange/TicksSupplyDemandLineChart';

const TickRange = combineHOC(
  withTicks,
  withTradeValueFilter,
)((props) => {
  return (
    <>
      <TicksSupplyDemandLineChart
        ticks={props.state.ticks}
        tradeValueFilter={props.state.tradeValueFilter}
      />
    </>
  );
});

export default TickRange;
