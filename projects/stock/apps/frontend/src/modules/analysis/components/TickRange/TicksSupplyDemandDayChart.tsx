import { CommonValue } from '@modules/analysis/value/common.value';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { forEach, sortBy, values } from 'lodash-es';
import moment from 'moment/moment';
import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

const TicksSupplyDemandDayChart = React.memo(
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
          sSheep: number;
          sShark: number;
          bSheep: number;
          bShark: number;
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
              console.error(tickRageData);
              errorInfo = new Error(
                `Tick data length not equal for symbol ${tickData?.symbol}`,
              );
            }

            forEach(tickData, (d: any) => {
              const date = moment(d.date).format('YY-MM-DD');
              if (!data[date]) {
                data[date] = {
                  date,
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

        marketTickRageData = sortBy(values(data));
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
                (d: any) => (type === 'sheep' ? d.bSheep : d.bShark),
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
                (d: any) => (type === 'sheep' ? d.sSheep : d.sShark),
              ),
              fill: false,
              borderColor:
                type === 'sheep'
                  ? CommonValue.SELL_SHEEP_COLOR
                  : CommonValue.SELL_SHARK_COLOR,
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

    if (!Array.isArray(tickRageData) || tickRageData.length === 0) {
      return <></>;
    }

    return (
      <>
        {chartJsConfig && (
          <Row
            title={`Mua bán từng ngày - ${
              type === 'sheep' ? 'SHEEP' : 'SHARK'
            }`}
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

export default TicksSupplyDemandDayChart;
