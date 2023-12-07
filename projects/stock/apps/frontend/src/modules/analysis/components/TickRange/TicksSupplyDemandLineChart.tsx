import { CommonValue } from '@modules/analysis/value/common.value';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { forEach, last, sortBy } from 'lodash';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

const TicksSupplyDemandLineChart = React.memo(
  (props: { ticks: any[]; tradeValueFilter: any }) => {
    const [viewByValue, setViewByValue] = useState(true);
    const tradeValue = props.tradeValueFilter[1];

    const lastTickDate = useMemo(() => {
      const lastTick = last(props.ticks);
      if (lastTick && lastTick['date']) {
        return `${lastTick['symbol']} - ${moment(lastTick.date).format(
          'YYYY-MM-DD',
        )}`;
      }
      return '';
    }, [props.ticks]);

    const data: any = useMemo(() => {
      const _data: any[] = [];

      let sBSheep = 0;
      let sBShark = 0;
      let sSSheep = 0;
      let sSShark = 0;

      forEach(sortBy(props.ticks, 'date'), (tick) => {
        const meta = tick['meta'];
        let bSheep = 0;
        let bShark = 0;
        let sSheep = 0;
        let sShark = 0;

        forEach(meta, (t) => {
          if (viewByValue) {
            if (t.a === 'B') {
              if (t.p * t.vol > tradeValue * 10 ** 6) {
                bShark += t.p * t.vol;
              } else {
                bSheep += t.p * t.vol;
              }
            } else if (t.a === 'S') {
              if (t.p * t.vol > tradeValue * 10 ** 6) {
                sShark += t.p * t.vol;
              } else {
                sSheep += t.p * t.vol;
              }
            }
          } else {
            if (t.a === 'B') {
              if (t.p * t.vol > tradeValue * 10 ** 6) {
                bShark += t.vol;
              } else {
                bSheep += t.vol;
              }
            } else if (t.a === 'S') {
              if (t.p * t.vol > tradeValue * 10 ** 6) {
                sShark += t.vol;
              } else {
                sSheep += t.vol;
              }
            }
          }
        });

        sBShark += bShark;
        sBSheep += bSheep;
        sSSheep += sSheep;
        sSShark += sShark;

        _data.push({
          date: tick.date,
          bSheep,
          bShark,
          sSheep,
          sShark,
          sBSheep,
          sBShark,
          sSSheep,
          sSShark,
          close: tick.close,
        });
      });

      return _data;
    }, [props.ticks, tradeValue, viewByValue]);

    const chartJsConfig: any = useMemo(() => {
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
    }, [data]);

    const chartJs1Config: any = useMemo(() => {
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
    }, [data]);

    const chartJsSumConfig: any = useMemo(() => {
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
    }, [data]);

    const chartJsSum1Config: any = useMemo(() => {
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
    }, [data]);

    return (
      <>
        <Row title={`${lastTickDate}`} oneCol={false}>
          <div className="grid grid-cols-1 gap-6 pt-2">
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
          </div>
        </Row>
        <Row title={`Mua bán từng ngày`} oneCol={false}>
          <div className="grid grid-cols-1 gap-6 pt-2">
            <label className="pt-6">Mua bán theo thời gian</label>
            <ChartJSPlugins plugins={['zoom']}>
              {chartJsConfig && <Line {...chartJsConfig} />}
            </ChartJSPlugins>
          </div>
        </Row>
        <Row title={`Mua bán từng ngày`} oneCol={false}>
          <div className="grid grid-cols-1 gap-6 pt-2">
            <label className="pt-6">Mua bán theo thời gian</label>
            <ChartJSPlugins plugins={['zoom']}>
              {chartJs1Config && <Line {...chartJs1Config} />}
            </ChartJSPlugins>
          </div>
        </Row>
        <Row
          title={`Mua bán cộng dồn từng ngày < ${tradeValue}`}
          oneCol={false}
        >
          <div className="grid grid-cols-1 gap-6 pt-2">
            <label className="pt-6">Mua bán cộng dồn theo thời gian</label>
            <ChartJSPlugins plugins={['zoom']}>
              {chartJsSumConfig && <Line {...chartJsSumConfig} />}
            </ChartJSPlugins>
          </div>
        </Row>
        <Row
          title={`Mua bán cộng dồn từng ngày > ${tradeValue}`}
          oneCol={false}
        >
          <div className="grid grid-cols-1 gap-6 pt-2">
            <label className="pt-6">Mua bán cộng dồn theo thời gian</label>
            <ChartJSPlugins plugins={['zoom']}>
              {chartJsSum1Config && <Line {...chartJsSum1Config} />}
            </ChartJSPlugins>
          </div>
        </Row>
      </>
    );
  },
);

export default TicksSupplyDemandLineChart;
