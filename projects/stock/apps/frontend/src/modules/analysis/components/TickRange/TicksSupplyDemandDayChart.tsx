import { CommonValue } from '@modules/analysis/value/common.value';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { compact, find, forEach, sortBy, values } from 'lodash-es';
import moment from 'moment/moment';
import React, { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

const TicksSupplyDemandDayChart = React.memo(
  (props: {
    tickRageData: any[];
    market?: boolean;
    vnindexes?: any[];
    type: 'sheep' | 'shark' | 'combine';
  }) => {
    const [view, setView] = useState({
      buySheep: true,
      buyShark: true,
      sellShark: true,
      sellSheep: true,
    });
    const { tickRageData, market, type, vnindexes } = props;
    const chartJsConfig: any = useMemo(() => {
      if (!Array.isArray(tickRageData)) {
        return undefined;
      }
      let marketTickRageData: any;
      let tickSize: number;
      const data: Record<
        string,
        {
          close: number;
          date: string;
          sSheep: number;
          sShark: number;
          bSheep: number;
          bShark: number;
        }
      > = {};

      if (market) {
        if (!vnindexes) {
          return undefined;
        }

        let errorInfo: Error;
        forEach(tickRageData, (t: any) => {
          const tickData = t?.data;

          if (tickData?.length > 0) {
            if (!tickSize) {
              tickSize = tickData.length;
            }

            if (tickSize !== tickData.length) {
              console.error(tickRageData);
              errorInfo = new Error(
                `Tick data length not equal for symbol ${tickData?.symbol}`,
              );
            }

            forEach(tickData, (d: any) => {
              const mDate = moment(d.date);
              const date = mDate.format('YY-MM-DD');
              const fDate = mDate.format('YYYY-MM-DD');
              const index = find(vnindexes, (md: any) => md.date === fDate);
              if (!data[date]) {
                data[date] = {
                  date,
                  close: index?.close ?? 0,
                  bSheep: 0,
                  bShark: 0,
                  sSheep: 0,
                  sShark: 0,
                };
              }

              if (type === 'sheep') {
                data[date].bSheep = data[date].bSheep + d.bSheep;
                data[date].sSheep = data[date].sSheep + d.sSheep;
              } else {
                data[date].bShark = data[date].bShark + d.bShark;
                data[date].sShark = data[date].sShark + d.sShark;
              }
            });
          } else {
            errorInfo = new Error(
              `Tick data empty for symbol ${tickData?.symbol}`,
            );

            return false;
          }
        });

        // @ts-ignore
        if (errorInfo) {
          console.error(errorInfo);
          return undefined;
        }

        marketTickRageData = sortBy(values(data), 'date');
      }

      return {
        data: {
          labels: market
            ? marketTickRageData.map((d: any) => d.date)
            : tickRageData.map((d: any) => moment(d.date).format('YY-MM-DD')),
          datasets: compact([
            ...[
              view.buySheep && (type === 'sheep' || type === 'combine')
                ? {
                    label: `buy Sheep`,
                    data: (market ? marketTickRageData : tickRageData).map(
                      (d: any) => d.bSheep,
                    ),
                    fill: false,
                    borderWidth: 1,
                    borderColor: CommonValue.BUY_SHEEP_COLOR,
                    tension: 0,
                  }
                : undefined,
            ],
            ...[
              view.buyShark && (type === 'shark' || type === 'combine')
                ? {
                    label: `buy Shark`,
                    data: (market ? marketTickRageData : tickRageData).map(
                      (d: any) => d.bShark,
                    ),
                    fill: false,
                    borderWidth: 1,
                    borderColor: CommonValue.BUY_SHARK_COLOR,
                    tension: 0,
                  }
                : undefined,
            ],
            ...[
              view.sellSheep && (type === 'sheep' || type === 'combine')
                ? {
                    label: `sell Sheep`,
                    data: (market ? marketTickRageData : tickRageData).map(
                      (d: any) => d.sSheep,
                    ),
                    fill: false,
                    borderWidth: 1,
                    borderColor: CommonValue.SELL_SHEEP_COLOR,
                    tension: 0,
                  }
                : undefined,
            ],
            ...[
              view.sellShark && (type === 'shark' || type === 'combine')
                ? {
                    label: `sell Shark`,
                    data: (market ? marketTickRageData : tickRageData).map(
                      (d: any) => d.sShark,
                    ),
                    fill: false,
                    borderWidth: 1,
                    borderColor: CommonValue.SELL_SHARK_COLOR,
                    tension: 0,
                  }
                : undefined,
            ],
            {
              label: `close`,
              data: (market ? marketTickRageData : tickRageData).map(
                (d: any) => d.close,
              ),
              fill: false,
              tension: 0,
              borderColor: 'white',
              borderWidth: 0.5,
              yAxisID: 'y1',
            },
          ]),
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
                overScaleMode: 'x',
              },
              pan: {
                enabled: true,
                mode: 'x',
              },
            },
          },
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
        },
      };
    }, [tickRageData, market, type, view, vnindexes]);
    console.log(chartJsConfig);
    if (!Array.isArray(tickRageData) || tickRageData.length === 0) {
      return <></>;
    }

    return (
      <>
        <Row
          title={`Mua bán từng ngày - ${type === 'sheep' ? 'SHEEP' : 'SHARK'}`}
          oneCol={false}
        >
          {type === 'combine' && (
            <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-6 lg:grid-cols-6">
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={view.buyShark}
                    onChange={() =>
                      setView({ ...view, buyShark: !view.buyShark })
                    }
                  />
                  <span className=" text-white-dark">buy Shark</span>
                </label>
              </div>
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={view.sellShark}
                    onChange={() =>
                      setView({ ...view, sellShark: !view.sellShark })
                    }
                  />
                  <span className=" text-white-dark">sell shark</span>
                </label>
              </div>
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={view.buySheep}
                    onChange={() =>
                      setView({ ...view, buySheep: !view.buySheep })
                    }
                  />
                  <span className=" text-white-dark">buy Sheep</span>
                </label>
              </div>
              <div>
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={view.sellSheep}
                    onChange={() =>
                      setView({ ...view, sellSheep: !view.sellSheep })
                    }
                  />
                  <span className=" text-white-dark">sell Sheep</span>
                </label>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 gap-6 pt-2">
            {chartJsConfig && (
              <ChartJSPlugins plugins={['zoom']}>
                <Line {...chartJsConfig} />
              </ChartJSPlugins>
            )}
          </div>
        </Row>
      </>
    );
  },
);

export default TicksSupplyDemandDayChart;
