'use client';

import TicksSupplyDemandLineChartWrapper from '@modules/analysis/components/TickRange/TicksSupplyDemandLineChartWrapper';
import { withCalTickRageWorker } from '@modules/analysis/hoc/withCalTickRageWorker';
import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withPrices } from '@modules/analysis/hoc/withPrices';
import { withRefreshTicks } from '@modules/analysis/hoc/withRefreshTick';
import { withSelectedSymbol } from '@modules/analysis/hoc/withSelectedSymbol';
import { withTicks } from '@modules/analysis/hoc/withTicks';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { combineHOC } from '@web/ui-extension';
import { find, map } from 'lodash-es';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

export default combineHOC(
  withSelectedSymbol,
  withTicks,
  withTradeValueFilter,
  withFromToDate,
  withRefreshTicks,
  withCalTickRageWorker,
  withPrices,
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

  const tickRageData = useMemo(() => {
    if (
      Array.isArray(props.state.tickRageData) &&
      Array.isArray(props.state.prices)
    ) {
      return map(props.state.tickRageData, (tickData: any) => {
        const price: any = find(props.state.prices, (p: any) =>
          moment(p.date).isSame(moment(tickData.date), 'day'),
        );
        return { ...tickData, close: price.rClose ?? 0 };
      });
    }

    return undefined;
  }, [props.state.tickRageData, props.state.prices]);

  return (
    <>
      <TicksSupplyDemandLineChartWrapper
        ticks={props.state.ticks}
        tradeValueFilter={props.state.tradeValueFilter}
        symbol={props.state.symbol ?? ''}
        viewByValue={viewByValue}
        setViewByValue={setViewByValue}
        tickRageData={tickRageData}
      />
    </>
  );
});
