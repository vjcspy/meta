'use client';

import TickAtPricesChart from '@modules/analysis/components/TickAtPrices/TickAtPricesChart';
import TickAtPricesSummary from '@modules/analysis/components/TickAtPrices/TickAtPricesSummary';
import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withPrices } from '@modules/analysis/hoc/withPrices';
import { withRefreshTicks } from '@modules/analysis/hoc/withRefreshTick';
import { withTicks } from '@modules/analysis/hoc/withTicks';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import Row from '@src/components/form/Row';
import { TickAction } from '@stock/packages-com';
import { combineHOC } from '@web/ui-extension';
import { first, forEach, last, reduce } from 'lodash-es';
import moment from 'moment/moment';
import { useMemo } from 'react';

const TickAtPrices = combineHOC(
  withTicks,
  withPrices,
  withTradeValueFilter,
  withFromToDate,
  withRefreshTicks,
)((props) => {
  const title = useMemo(() => {
    const lastTick: any = last(props?.state?.ticks);
    const firstTick: any = first(props?.state?.ticks);

    if (lastTick) {
      return `${firstTick?.symbol} from ${moment(firstTick['date']).format(
        'YYYY-MM-DD',
      )} to ${moment(lastTick['date']).format('YYYY-MM-DD')}`;
    }

    return 'Not found ticks data';
  }, [props?.state?.prices, props?.state?.ticks]);

  const chartData = useMemo(() => {
    if (!Array.isArray(props.state.ticks) || props.state.ticks.length === 0) {
      return undefined;
    }
    const filterValue =
      Array.isArray(props?.state?.tradeValueFilter) &&
      props?.state?.tradeValueFilter.length === 3
        ? props?.state?.tradeValueFilter[1]
        : 250;

    const data: any[] = reduce(
      props.state.ticks ?? [],
      (prev: any[], curr) => {
        if (curr && Array.isArray(curr['meta'])) {
          forEach(curr['meta'], (value: any) => {
            if (value['a'] === 'B') {
              if (value['p'] * value['vol'] > filterValue * 10 ** 6) {
                prev.push({ ...value, a: TickAction.BUY_SHARK });
              } else {
                prev.push({ ...value, a: TickAction.BUY_SHEEP });
              }
            } else if (value['a'] === 'S') {
              if (value['p'] * value['vol'] > filterValue * 10 ** 6) {
                prev.push({ ...value, a: TickAction.SELL_SHARK });
              } else {
                prev.push({ ...value, a: TickAction.SELL_SHEEP });
              }
            } else {
              prev.push({
                ...value,
                a: TickAction.SELL_AT,
                vol: parseInt(String(value.vol / 2)),
              });
              prev.push({
                ...value,
                a: TickAction.BUY_AT,
                vol: parseInt(String(value.vol / 2)),
              });
            }
          });
        }

        return prev;
      },
      [],
    );

    return data;
  }, [props?.state?.ticks, props?.state?.tradeValueFilter]);

  return (
    <>
      <Row title={title} oneCol={false}>
        <div className="grid grid-cols-1 gap-6 pt-2">
          <div>
            <TickAtPricesChart
              ticks={props?.state?.ticks ?? []}
              tradeValueFilter={props?.state?.tradeValueFilter}
              data={chartData}
            />
          </div>
        </div>
      </Row>
      <Row title="Summary" oneCol={false}>
        <div className="grid grid-cols-1 gap-6 pt-2">
          <div>
            <TickAtPricesSummary data={chartData} />
          </div>
        </div>
      </Row>
    </>
  );
});

export default TickAtPrices;
