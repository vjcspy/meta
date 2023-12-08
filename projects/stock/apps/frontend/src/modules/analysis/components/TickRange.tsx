'use client';

import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withRefreshTicks } from '@modules/analysis/hoc/withRefreshTick';
import { withSelectedSymbol } from '@modules/analysis/hoc/withSelectedSymbol';
import { withTicks } from '@modules/analysis/hoc/withTicks';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { combineHOC } from '@web/ui-extension';
import moment from 'moment';
import { useEffect } from 'react';

import TicksSupplyDemandLineChart from './TickRange/TicksSupplyDemandLineChart';

const TickRange = combineHOC(
  withSelectedSymbol,
  withTicks,
  withTradeValueFilter,
  withFromToDate,
  withRefreshTicks,
)((props) => {
  useEffect(() => {
    props?.actions?.setFromDate(
      moment().utc().subtract(90, 'days').format('YYYY-MM-DD'),
    );
  }, []);
  return (
    <>
      <TicksSupplyDemandLineChart
        ticks={props.state.ticks}
        tradeValueFilter={props.state.tradeValueFilter}
        symbol={props.state.symbol ?? ''}
      />
    </>
  );
});

export default TickRange;
