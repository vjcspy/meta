'use client';

import TickAtPricesChart from '@modules/analysis/components/TickAtPrices/TickAtPricesChart';
import TickAtPricesSummary from '@modules/analysis/components/TickAtPrices/TickAtPricesSummary';
import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withPrices } from '@modules/analysis/hoc/withPrices';
import { withRefreshTicks } from '@modules/analysis/hoc/withRefreshTick';
import { withTicks } from '@modules/analysis/hoc/withTicks';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension';
import { first, last } from 'lodash-es';
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

  return (
    <>
      <Row title={title} oneCol={false}>
        <div className="grid grid-cols-1 gap-6 pt-2">
          <div>
            <TickAtPricesChart
              ticks={props?.state?.ticks ?? []}
              tradeValueFilter={props?.state?.tradeValueFilter}
            />
          </div>
        </div>
      </Row>
      <Row title="Summary" oneCol={false}>
        <div className="grid grid-cols-1 gap-6 pt-2">
          <div>
            <TickAtPricesSummary ticks={props?.state?.ticks ?? []} />
          </div>
        </div>
      </Row>
    </>
  );
});

export default TickAtPrices;
