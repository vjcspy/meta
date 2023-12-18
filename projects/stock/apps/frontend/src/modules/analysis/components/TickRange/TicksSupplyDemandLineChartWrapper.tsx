import TicksSupplyDemandDayChart from '@modules/analysis/components/TickRange/TicksSupplyDemandDayChart';
import TicksSupplyDemandSumDayChart from '@modules/analysis/components/TickRange/TicksSupplyDemandSumDayChart';
import Row from '@src/components/form/Row';
import { last } from 'lodash-es';
import moment from 'moment';
import React, { useMemo, useState } from 'react';

const defaultViewChart = {
  sumShark: false,
  sumSheep: false,
  shark: false,
  sheep: false,
};

const TicksSupplyDemandLineChartWrapper = (props: {
  ticks: any[];
  tradeValueFilter: any;
  symbol: string;
  tickRageData: any;
  setViewByValue: any;
  viewByValue: any;
}) => {
  const { setViewByValue, viewByValue } = props;
  const [viewChart, setViewChart] = useState({
    sumShark: false,
    sumSheep: true,
    shark: false,
    sheep: false,
  });

  const lastTickDate = useMemo(() => {
    const lastTick = last(props.ticks);
    if (lastTick) {
      if (lastTick['date']) {
        if (lastTick['symbol'] !== props.symbol) {
          return `Loading data for ${props.symbol}...`;
        }

        return `${lastTick['symbol']} - ${moment(lastTick.date).format(
          'YYYY-MM-DD',
        )}`;
      }
    }
    return 'Loading ...';
  }, [props.ticks, props.symbol]);

  return (
    <>
      <Row title={`${lastTickDate}`} oneCol={false}>
        {props.tickRageData && (
          <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-6 lg:grid-cols-6">
            <div>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={viewByValue}
                  onChange={() => setViewByValue(!viewByValue)}
                />
                <span className=" text-white-dark">View By Value</span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={viewChart.sumSheep}
                  onChange={() =>
                    setViewChart({
                      ...defaultViewChart,
                      sumSheep: !viewChart.sumSheep,
                    })
                  }
                />
                <span className=" text-white-dark">View Sum Sheep</span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={viewChart.sumShark}
                  onChange={() =>
                    setViewChart({
                      ...defaultViewChart,
                      sumShark: !viewChart.sumShark,
                    })
                  }
                />
                <span className=" text-white-dark">View Sum Shark</span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={viewChart.sheep}
                  onChange={() =>
                    setViewChart({
                      ...defaultViewChart,
                      sheep: !viewChart.sheep,
                    })
                  }
                />
                <span className=" text-white-dark">View Sheep</span>
              </label>
            </div>
            <div>
              <label className="flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  checked={viewChart.shark}
                  onChange={() =>
                    setViewChart({
                      ...defaultViewChart,
                      shark: !viewChart.shark,
                    })
                  }
                />
                <span className=" text-white-dark">View shark</span>
              </label>
            </div>
          </div>
        )}
      </Row>

      {viewChart.sheep && (
        <TicksSupplyDemandDayChart
          tickRageData={props.tickRageData}
          type="sheep"
        />
      )}

      {viewChart.shark && (
        <TicksSupplyDemandDayChart
          tickRageData={props.tickRageData}
          type="shark"
        />
      )}

      {viewChart.sumShark && (
        <TicksSupplyDemandSumDayChart
          tickRageData={props.tickRageData}
          type="shark"
        />
      )}

      {viewChart.sumSheep && (
        <TicksSupplyDemandSumDayChart
          tickRageData={props.tickRageData}
          type="sheep"
        />
      )}
    </>
  );
};
export default TicksSupplyDemandLineChartWrapper;
