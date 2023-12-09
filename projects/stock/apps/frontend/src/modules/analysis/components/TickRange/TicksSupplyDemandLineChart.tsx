import { CommonValue } from '@modules/analysis/value/common.value';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { last } from 'lodash';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

const defaultViewChart = {
  sumShark: false,
  sumSheep: false,
  shark: false,
  sheep: false,
};

const TicksSupplyDemandLineChart = (props: {
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
  const tradeValue = props.tradeValueFilter[1];

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

  const data = props.tickRageData;

  const chartJsConfig: any = useMemo(() => {
    if (!viewChart.sheep || !data) {
      return undefined;
    }

    return {
      data: {
        labels: data.map((d: any) => moment(d.date).format('MM-DD')),
        datasets: [
          {
            label: `Buy < ${tradeValue}`,
            data: data.map((d: any) => d.bSheep),
            fill: false,
            borderColor: CommonValue.BUY_SHEEP_COLOR,
            tension: 0,
          },
          {
            label: `Sell < ${tradeValue}`,
            data: data.map((d: any) => d.sSheep),
            fill: false,
            borderColor: CommonValue.SELL_SHEEP_COLOR,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: false,
              },
              mode: 'x',
              // scaleMode: 'y',
              // overScaleMode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          },
        },
      },
    };
  }, [data, viewChart.sheep]);

  const chartJs1Config: any = useMemo(() => {
    if (!viewChart.shark || !data) {
      return undefined;
    }

    return {
      data: {
        labels: data.map((d: any) => moment(d.date).format('MM-DD')),
        datasets: [
          {
            label: `Buy > ${tradeValue}`,
            data: data.map((d: any) => d.bShark),
            fill: false,
            borderColor: CommonValue.BUY_SHARK_COLOR,
            tension: 0,
          },
          {
            label: `Sell > ${tradeValue}`,
            data: data.map((d: any) => d.sShark),
            fill: false,
            borderColor: CommonValue.SELL_SHARK_COLOR,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: false,
              },
              mode: 'x',
              // scaleMode: 'y',
              // overScaleMode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          },
        },
      },
    };
  }, [data, viewChart.shark]);

  const chartJsSumConfig: any = useMemo(() => {
    if (!viewChart.sumSheep || !data) {
      return undefined;
    }
    return {
      data: {
        labels: data.map((d: any) => moment(d.date).format('MM-DD')),
        datasets: [
          {
            label: `Buy < ${tradeValue}`,
            data: data.map((d: any) => d.sBSheep),
            fill: false,
            borderColor: CommonValue.BUY_SHEEP_COLOR,
            tension: 0,
            yAxisID: 'y',
          },
          {
            label: `Sell < ${tradeValue}`,
            data: data.map((d: any) => d.sSSheep),
            fill: false,
            borderColor: CommonValue.SELL_SHEEP_COLOR,
            tension: 0,
            yAxisID: 'y',
          },
          {
            label: `Diff`,
            data: data.map((d: any) => d.sBSheep - d.sSSheep),
            fill: false,
            borderColor: 'pink',
            tension: 0,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        stacked: false,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: false,
              },
              mode: 'x',
              // scaleMode: 'y',
              // overScaleMode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          },
        },
      },
    };
  }, [data, viewChart.sumSheep]);

  const chartJsSum1Config: any = useMemo(() => {
    if (!viewChart.sumShark || !data) {
      return undefined;
    }
    return {
      data: {
        labels: data.map((d: any) => moment(d.date).format('MM-DD')),
        datasets: [
          {
            label: `Buy > ${tradeValue}`,
            data: data.map((d: any) => d.sBShark),
            fill: false,
            borderColor: CommonValue.BUY_SHARK_COLOR,
            tension: 0,
            yAxisID: 'y',
          },
          {
            label: `Sell > ${tradeValue}`,
            data: data.map((d: any) => d.sSShark),
            fill: false,
            borderColor: CommonValue.SELL_SHARK_COLOR,
            tension: 0,
            yAxisID: 'y',
          },
          {
            label: `Diff`,
            data: data.map((d: any) => d.sBShark - d.sSShark),
            fill: false,
            borderColor: 'pink',
            tension: 0,
            yAxisID: 'y1',
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: false,
              },
              mode: 'x',
              // scaleMode: 'y',
              // overScaleMode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          },
        },
      },
    };
  }, [data, viewChart.sumShark]);

  return (
    <>
      <Row title={`${lastTickDate}`} oneCol={false}>
        {data && (
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

      {chartJsConfig && (
        <Row title={`Mua bán từng ngày`} oneCol={false}>
          <div className="grid grid-cols-1 gap-6 pt-2">
            <label className="pt-6">Mua bán theo thời gian</label>
            <ChartJSPlugins plugins={['zoom']}>
              <Line {...chartJsConfig} />
            </ChartJSPlugins>
          </div>
        </Row>
      )}

      {chartJs1Config && (
        <Row title={`Mua bán từng ngày`} oneCol={false}>
          <div className="grid grid-cols-1 gap-6 pt-2">
            <label className="pt-6">Mua bán theo thời gian</label>
            <ChartJSPlugins plugins={['zoom']}>
              <Line {...chartJs1Config} />
            </ChartJSPlugins>
          </div>
        </Row>
      )}

      {chartJsSumConfig && (
        <Row
          title={`Mua bán cộng dồn từng ngày < ${tradeValue}`}
          oneCol={false}
        >
          <div className="grid grid-cols-1 gap-6 pt-2">
            <label className="pt-6">Mua bán cộng dồn theo thời gian</label>
            <ChartJSPlugins plugins={['zoom']}>
              <Line {...chartJsSumConfig} />
            </ChartJSPlugins>
          </div>
        </Row>
      )}

      {chartJsSum1Config && (
        <Row
          title={`Mua bán cộng dồn từng ngày > ${tradeValue}`}
          oneCol={false}
        >
          <div className="grid grid-cols-1 gap-6 pt-2">
            <label className="pt-6">Mua bán cộng dồn theo thời gian</label>
            <ChartJSPlugins plugins={['zoom']}>
              <Line {...chartJsSum1Config} />
            </ChartJSPlugins>
          </div>
        </Row>
      )}
    </>
  );
};
export default TicksSupplyDemandLineChart;
