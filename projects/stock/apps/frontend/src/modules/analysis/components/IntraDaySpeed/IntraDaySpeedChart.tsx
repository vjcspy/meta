import withTimeRes from '@modules/analysis/hoc/withTimeRes';
import { CHARTJS_INTRADAY_OPTIONS } from '@modules/analysis/value/chartjs.value';
import { CommonValue } from '@modules/analysis/value/common.value';
import { message } from '@modules/app/util/message';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { mergeTickActionInfo } from '@stock/packages-com/dist/tick/merge-tick-action-info';
import { combineHOC } from '@web/ui-extension/dist';
import type { ChartData } from 'chart.js';
import { compact, forEach, keys, round } from 'lodash-es';
import moment from 'moment/moment';
import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

const avgFields = {
  avg_shark_buy_value: 395,
  avg_shark_sell_value: 937,
  avg_sheep_buy_value: 289,
  avg_sheep_sell_value: 537,
  avg_buy_count: 5,
  avg_sell_count: 9,
  avg_buy_value: 684,
  avg_sell_value: 1473,
};

const isAvgFieldEqualsZero = (data: any) => {
  let isZero = false;
  forEach(keys(avgFields), (key) => {
    if (data[key] === 0) {
      isZero = true;

      return false;
    }
  });
  return isZero;
};

const chartLines = {
  sharkBuyVal: false,
  sharkSellVal: false,
  sheepBuyVal: false,
  sheepSellVal: false,
  buyVal: true,
  sellVal: true,
  buyCount: false,
  sellCount: false,
};

export default combineHOC(withTimeRes)((props) => {
  const [chartLine, setChartLine] = useState(chartLines);

  const chartJsConfig: any = useMemo(() => {
    if (!props?.intraDaySpeedData) {
      return undefined;
    }
    const historyAvgData: any = props.intraDaySpeedData?.tickHistoryAvgData;
    if (!historyAvgData) {
      return undefined;
    }

    if (isAvgFieldEqualsZero(historyAvgData)) {
      message().error({ content: 'AVG data to compare has zero value' });
      return undefined;
    }

    const groupedData = mergeTickActionInfo(
      props.intraDaySpeedData.tickActionData,
      props.state.timeRes,
    );

    if (!Array.isArray(groupedData) || groupedData.length === 0) {
      return undefined;
    }

    const timeResMultiple = props.state?.timeRes ?? 1;

    const chartData: ChartData = {
      labels: groupedData.map((d) => moment.unix(d.ts).format('HH:mm')),
      datasets: compact([
        chartLine.buyVal && {
          label: 'buy val',
          data: groupedData.map((d: any) =>
            round(
              d.buy_value / (historyAvgData.avg_buy_value * timeResMultiple),
              2,
            ),
          ),
          fill: false,
          borderColor: CommonValue.BUY_COLOR,
          borderWidth: 1,
          tension: 0,
        },
        chartLine.sellVal && {
          label: 'sell val',
          data: groupedData.map((d: any) =>
            round(
              d.sell_value / (historyAvgData.avg_sell_value * timeResMultiple),
              2,
            ),
          ),
          fill: false,
          borderColor: CommonValue.SELL_COLOR,
          borderWidth: 1,
          tension: 0,
        },
        chartLine.buyCount && {
          label: 'buy count',
          data: groupedData.map((d: any) =>
            round(
              d.buy_count / (historyAvgData.avg_buy_count * timeResMultiple),
              2,
            ),
          ),
          fill: false,
          borderColor: CommonValue.BUY_COUNT_COLOR,
          borderWidth: 1,
          tension: 0,
        },
        chartLine.sellCount && {
          label: 'sell count',
          data: groupedData.map((d: any) =>
            round(
              d.sell_count / (timeResMultiple * historyAvgData.avg_sell_count),
              2,
            ),
          ),
          fill: false,
          borderColor: CommonValue.SELL_COUNT_COLOR,
          borderWidth: 1,
          tension: 0,
        },

        chartLine.sharkBuyVal && {
          label: 'shark buy val',
          data: groupedData.map((d: any) =>
            round(
              d.shark_buy_value /
                (timeResMultiple * historyAvgData.avg_shark_buy_value),
              2,
            ),
          ),
          fill: false,
          borderWidth: 1,
          borderColor: CommonValue.BUY_SHARK_COLOR,
          tension: 0,
        },
        chartLine.sharkSellVal && {
          label: 'shark sell val',
          data: groupedData.map((d: any) =>
            round(
              d.shark_sell_value /
                (timeResMultiple * historyAvgData.avg_shark_sell_value),
              2,
            ),
          ),
          fill: false,
          borderWidth: 1,
          borderColor: CommonValue.SELL_SHARK_COLOR,
          tension: 0,
        },

        chartLine.sheepBuyVal && {
          label: 'sheep buy val',
          data: groupedData.map((d: any) =>
            round(d.sheep_buy_value / historyAvgData.avg_sheep_buy_value, 2),
          ),
          fill: false,
          borderWidth: 1,
          borderColor: CommonValue.BUY_SHEEP_COLOR,
          tension: 0,
        },
        chartLine.sheepSellVal && {
          label: 'sheep sell val',
          data: groupedData.map((d: any) =>
            round(
              d.sheep_sell_value /
                (timeResMultiple * historyAvgData.avg_sheep_sell_value),
              2,
            ),
          ),
          fill: false,
          borderWidth: 1,
          borderColor: CommonValue.SELL_SHEEP_COLOR,
          tension: 0,
        },
      ]),
    };

    return chartData;
  }, [props?.intraDaySpeedData, props.state.timeRes, chartLine]);

  return (
    <>
      <Row
        title={`IntraDay Speed Chart: ${props?.intraDaySpeedData?.tickHistoryAvgData?.date}`}
        oneCol={false}
      >
        <div className="grid grid-cols-1 gap-6 py-2 md:grid-cols-4 lg:grid-cols-4">
          <div>
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={chartLine.buyVal}
                onChange={() =>
                  setChartLine({ ...chartLine, buyVal: !chartLine.buyVal })
                }
              />
              <span className=" text-white-dark">buy val</span>
            </label>
          </div>
          <div>
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={chartLine.sellVal}
                onChange={() =>
                  setChartLine({ ...chartLine, sellVal: !chartLine.sellVal })
                }
              />
              <span className=" text-white-dark">sell val</span>
            </label>
          </div>
          <div>
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={chartLine.buyCount}
                onChange={() =>
                  setChartLine({ ...chartLine, buyCount: !chartLine.buyCount })
                }
              />
              <span className=" text-white-dark">buy count</span>
            </label>
          </div>
          <div>
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={chartLine.sellCount}
                onChange={() =>
                  setChartLine({
                    ...chartLine,
                    sellCount: !chartLine.sellCount,
                  })
                }
              />
              <span className=" text-white-dark">sell count</span>
            </label>
          </div>

          <div>
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={chartLine.sharkBuyVal}
                onChange={() =>
                  setChartLine({
                    ...chartLine,
                    sharkBuyVal: !chartLine.sharkBuyVal,
                  })
                }
              />
              <span className=" text-white-dark">shark buy val</span>
            </label>
          </div>
          <div>
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={chartLine.sharkSellVal}
                onChange={() =>
                  setChartLine({
                    ...chartLine,
                    sharkSellVal: !chartLine.sharkSellVal,
                  })
                }
              />
              <span className=" text-white-dark">shark sell val</span>
            </label>
          </div>

          <div>
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={chartLine.sheepBuyVal}
                onChange={() =>
                  setChartLine({
                    ...chartLine,
                    sheepBuyVal: !chartLine.sheepBuyVal,
                  })
                }
              />
              <span className=" text-white-dark">sheep buy val</span>
            </label>
          </div>
          <div>
            <label className="flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={chartLine.sheepSellVal}
                onChange={() =>
                  setChartLine({
                    ...chartLine,
                    sheepSellVal: !chartLine.sheepSellVal,
                  })
                }
              />
              <span className=" text-white-dark">sheep sell val</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 py-2">
          <ChartJSPlugins plugins={['zoom']}>
            {chartJsConfig && (
              <Line
                data={chartJsConfig}
                options={CHARTJS_INTRADAY_OPTIONS as any}
              />
            )}
          </ChartJSPlugins>
        </div>
      </Row>
    </>
  );
});
