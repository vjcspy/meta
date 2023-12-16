import { CommonValue } from '@modules/analysis/value/common.value';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { difference, first, forEach, size, sortBy, values } from 'lodash-es';
import moment from 'moment/moment';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

const TicksSupplyDemandSumDayChart = React.memo(
  (props: {
    tickRageData: any[];
    market?: boolean;
    type: 'sheep' | 'shark';
  }) => {
    const { tickRageData, market = false, type } = props;

    const chartJsConfig: any = useMemo(() => {
      if (!Array.isArray(tickRageData)) {
        return undefined;
      }
      let marketTickRageData: any;
      let tickSize: number;
      const data: Record<
        string,
        {
          date: string;
          sBSheep: number;
          sBShark: number;
          sSSheep: number;
          sSShark: number;
        }
      > = {};
      if (market) {
        let errorInfo: Error;
        forEach(tickRageData, (t: any) => {
          const tickData = t?.data;

          if (tickData?.length > 0) {
            if (!tickSize) {
              tickSize = tickData.length;
            }

            if (tickSize !== tickData.length) {
              const diffDates = difference(
                first(tickRageData)?.data?.map((d: any) => d.date),
                t?.data?.map((d: any) => d.date),
              );
              console.error(
                `Tick data length not equal for symbol ${t?.symbol}`,
                tickRageData,
                'diffDates',
                diffDates,
              );
              errorInfo = new Error(
                `Tick data length not equal for symbol ${t?.symbol}`,
              );
            }

            forEach(tickData, (d: any) => {
              const date = moment(d.date).format('YY-MM-DD');
              if (!data[date]) {
                data[date] = {
                  date,
                  sBSheep: 0,
                  sBShark: 0,
                  sSSheep: 0,
                  sSShark: 0,
                };
              }

              if (type === 'sheep') {
                data[date].sBSheep = data[date].sBSheep + d.sBSheep;
                data[date].sSSheep = data[date].sSSheep + d.sSSheep;
              } else {
                data[date].sBShark = data[date].sBShark + d.sBShark;
                data[date].sSShark = data[date].sSShark + d.sSShark;
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

        marketTickRageData = sortBy(values(data), (a) => a.date);
      }

      return {
        data: {
          labels: market
            ? marketTickRageData.map((d: any) => d.date)
            : tickRageData.map((d: any) => moment(d.date).format('YY-MM-DD')),
          datasets: [
            {
              label: `Buy `,
              data: (market ? marketTickRageData : tickRageData).map(
                (d: any) => {
                  return type === 'sheep' ? d.sBSheep : d.sBShark;
                },
              ),
              fill: false,
              borderColor:
                type === 'sheep'
                  ? CommonValue.BUY_SHEEP_COLOR
                  : CommonValue.BUY_SHARK_COLOR,
              tension: 0,
            },
            {
              label: `Sell`,
              data: (market ? marketTickRageData : tickRageData).map(
                (d: any) => (type === 'sheep' ? d.sSSheep : d.sSShark),
              ),
              fill: false,
              borderColor:
                type === 'sheep'
                  ? CommonValue.SELL_SHEEP_COLOR
                  : CommonValue.SELL_SHARK_COLOR,
              tension: 0,
            },
            {
              label: `Diff`,
              data: (market ? marketTickRageData : tickRageData).map(
                (d: any) =>
                  type === 'sheep'
                    ? d.sBSheep - d.sSSheep
                    : d.sBShark - d.sSShark,
              ),
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
                overScaleMode: 'x',
              },
              pan: {
                enabled: true,
                mode: 'x',
              },
            },
          },
        },
      };
    }, [tickRageData, market, type]);

    return (
      <>
        {chartJsConfig && (
          <Row
            title={`Mua bán cộng dồn - ${
              type === 'sheep' ? 'SHEEP' : 'SHARK'
            } (${market ? size(tickRageData) : 1} symbols)`}
            oneCol={false}
          >
            <div className="grid grid-cols-1 gap-6 pt-2">
              <ChartJSPlugins plugins={['zoom']}>
                <Line {...chartJsConfig} />
              </ChartJSPlugins>
            </div>
          </Row>
        )}
      </>
    );
  },
);

export default TicksSupplyDemandSumDayChart;
