'use client';

import TickAtPricesChart from '@modules/analysis/components/TickAtPrices/TickAtPricesChart';
import TickAtPricesSummary from '@modules/analysis/components/TickAtPrices/TickAtPricesSummary';
import { withPrices } from '@modules/analysis/hoc/withPrices';
import { withTicks } from '@modules/analysis/hoc/withTicks';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension';
import { last } from 'lodash';
import moment from 'moment/moment';
import { useMemo } from 'react';

const TickAtPrices = combineHOC(
  withTicks,
  withPrices,
)((props) => {
  const title = useMemo(() => {
    const lastTick: any = last(props?.state?.ticks);

    if (lastTick) {
      const lastDate = lastTick['date'];

      return `Last tick: ${moment(lastDate).format('YYYY-MM-DD')}`;
    }

    return 'Not found ticks data';
  }, [props?.state?.prices, props?.state?.ticks]);

  return (
    <>
      <Row title={title} oneCol={false}>
        <div className="grid grid-cols-1 gap-6 pt-2">
          <div>
            <TickAtPricesChart ticks={props?.state?.ticks ?? []} />
          </div>
        </div>
      </Row>
      <Row title="Summary" oneCol={false}>
        <div className="grid grid-cols-1 gap-6 pt-2">
          <div>
            <TickAtPricesSummary />
          </div>
        </div>
      </Row>
    </>
  );
});

export default TickAtPrices;
