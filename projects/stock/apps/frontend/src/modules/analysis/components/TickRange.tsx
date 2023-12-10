'use client';

import { withCalTickRageWorker } from '@modules/analysis/hoc/withCalTickRageWorker';
import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withRefreshTicks } from '@modules/analysis/hoc/withRefreshTick';
import { withSelectedSymbol } from '@modules/analysis/hoc/withSelectedSymbol';
import { withTicks } from '@modules/analysis/hoc/withTicks';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { combineHOC } from '@web/ui-extension';
import moment from 'moment';
import { useEffect, useState } from 'react';

import TicksSupplyDemandLineChart from './TickRange/TicksSupplyDemandLineChart';

const TickRange = combineHOC(
  withSelectedSymbol,
  withTicks,
  withTradeValueFilter,
  withFromToDate,
  withRefreshTicks,
  withCalTickRageWorker,
)((props) => {
  useDebugRender('TickRange');

  useEffect(() => {
    props?.actions?.setFromDate(
      moment().utc().subtract(90, 'days').format('YYYY-MM-DD'),
    );
  }, []);

  const [viewByValue, setViewByValue] = useState(true);

  useEffect(() => {
    if (
      Array.isArray(props.state.ticks) &&
      props.state.ticks.length > 0 &&
      props.state?.symbol
    ) {
      props.actions?.calTickRangeData({
        ticks: props.state.ticks,
        tradeValue: props.state.tradeValueFilter?.[1],
        viewByValue,
        symbol: props.state.symbol,
      });
    }
  }, [
    props.state?.ticks,
    props.state?.tradeValueFilter?.[1],
    viewByValue,
    props.state?.symbol,
  ]);

  return (
    <>
      <TicksSupplyDemandLineChart
        ticks={props.state.ticks}
        tradeValueFilter={props.state.tradeValueFilter}
        symbol={props.state.symbol ?? ''}
        viewByValue={viewByValue}
        setViewByValue={setViewByValue}
        tickRageData={props.state.tickRageData}
      />
    </>
  );
});

export default TickRange;
