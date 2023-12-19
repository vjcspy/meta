import withMarketIntraDayChartData from '@modules/analysis/hoc/market-intra-day/withMarketIntraDayChartData';
import withMarketTickCat from '@modules/analysis/hoc/withMarketTickCat';
import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import { CHARTJS_INTRADAY_OPTIONS } from '@modules/analysis/value/chartjs.value';
import { CommonValue } from '@modules/analysis/value/common.value';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { TIMEZONE } from '@src/value/common.value';
import { combineHOC } from '@web/ui-extension/dist';
import type { ChartData } from 'chart.js';
import { round } from 'lodash-es';
import momentTimezone from 'moment-timezone';
import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

const defaultViewChart = {
  buySheep: false,
  buyShark: false,
  sellSheep: false,
  sellShark: false,
  diffSheep: false,
  diffShark: false,
};

export default combineHOC(
  withMarketIntraDayChartData,
  withMarketTickCat,
)((props) => {
  const [viewChart, setViewChart] = useState({
    ...defaultViewChart,
    diffSheep: true,
  });
  const hasSymbolInCurrentCat = useMemo(() => {
    return props?.state?.selectedMarketCat?.symbols.length > 0;
  }, [props?.state?.selectedMarketCat?.symbols]);

  const chartJsConfig: ChartData | any = useMemo(() => {
    if (!props?.state.chartData) {
      return undefined;
    }

    const data: ChartData = {
      labels: props.state.chartData.historyIntraDayData.map((d) =>
        momentTimezone.unix(d.ts).tz(TIMEZONE).format('HH:mm'),
      ),
      datasets: [
        {
          label: 'history',
          data: props.state.chartData.historyIntraDayData.map((d) => {
            if (viewChart.sellShark) {
              return round(d.sum_shark_sell / MarketIntraDay.BACK_DATE);
            } else if (viewChart.sellSheep) {
              return round(d.sum_sheep_sell / MarketIntraDay.BACK_DATE);
            } else if (viewChart.buyShark) {
              return round(d.sum_shark_buy / MarketIntraDay.BACK_DATE);
            } else if (viewChart.buySheep) {
              return round(d.sum_sheep_buy / MarketIntraDay.BACK_DATE);
            } else if (viewChart.diffShark) {
              return round(d.diff_sum_shark / MarketIntraDay.BACK_DATE);
            } else if (viewChart.diffSheep) {
              return round(d.diff_sum_sheep / MarketIntraDay.BACK_DATE);
            }

            return 0;
          }),
          fill: true,
          borderColor: CommonValue.INTRADAY_HISTORY_COLOR,
          backgroundColor: CommonValue.INTRADAY_HISTORY_COLOR,
        },
        {
          label: 'current',
          data: props.state.chartData.currentIntraDayData.map((d) => {
            if (viewChart.sellShark) {
              return d.sum_shark_sell;
            } else if (viewChart.sellSheep) {
              return d.sum_sheep_sell;
            } else if (viewChart.buyShark) {
              return d.sum_shark_buy;
            } else if (viewChart.buySheep) {
              return d.sum_sheep_buy;
            } else if (viewChart.diffShark) {
              return d.diff_sum_shark;
            } else if (viewChart.diffSheep) {
              return d.diff_sum_sheep;
            }

            return 0;
          }),
          borderColor: CommonValue.INTRADAY_CURRENT_COLOR,
          backgroundColor: CommonValue.INTRADAY_CURRENT_COLOR,
          fill: false,
        },
      ],
    };

    return data;
  }, [props.state.chartData, viewChart]);

  if (!chartJsConfig) {
    return <></>;
  }

  return (
    <>
      <Row title={`Market Ticks Chart`} oneCol={false}>
        {!hasSymbolInCurrentCat &&
          "Current market category don't have any symbol"}

        {hasSymbolInCurrentCat && (
          <>
            <div className="grid grid-cols-1 gap-6 py-2 md:grid-cols-6 lg:grid-cols-6">
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={viewChart.diffSheep}
                    onChange={() =>
                      setViewChart({
                        ...defaultViewChart,
                        diffSheep: !viewChart.diffSheep,
                      })
                    }
                  />
                  <span className=" text-white-dark">View Diff Sheep</span>
                </label>
              </div>
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={viewChart.diffShark}
                    onChange={() =>
                      setViewChart({
                        ...defaultViewChart,
                        diffShark: !viewChart.diffShark,
                      })
                    }
                  />
                  <span className=" text-white-dark">View Diff Shark</span>
                </label>
              </div>
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={viewChart.buySheep}
                    onChange={() =>
                      setViewChart({
                        ...defaultViewChart,
                        buySheep: !viewChart.buySheep,
                      })
                    }
                  />
                  <span className=" text-white-dark">View Buy Sheep</span>
                </label>
              </div>
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={viewChart.sellSheep}
                    onChange={() =>
                      setViewChart({
                        ...defaultViewChart,
                        sellSheep: !viewChart.sellSheep,
                      })
                    }
                  />
                  <span className=" text-white-dark">View Sell Sheep</span>
                </label>
              </div>
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={viewChart.buyShark}
                    onChange={() =>
                      setViewChart({
                        ...defaultViewChart,
                        buyShark: !viewChart.buyShark,
                      })
                    }
                  />
                  <span className=" text-white-dark">View Buy Shark</span>
                </label>
              </div>
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={viewChart.sellShark}
                    onChange={() =>
                      setViewChart({
                        ...defaultViewChart,
                        sellShark: !viewChart.sellShark,
                      })
                    }
                  />
                  <span className=" text-white-dark">View Sell Shark</span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-6 lg:grid-cols-6">
              <ChartJSPlugins plugins={['zoom']}>
                {chartJsConfig && (
                  <Line
                    data={chartJsConfig}
                    options={CHARTJS_INTRADAY_OPTIONS}
                  />
                )}
              </ChartJSPlugins>
            </div>
          </>
        )}
      </Row>
    </>
  );
});
