import { CommonValue } from '@modules/analysis/value/common.value';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
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

      if (market) {
        return {};
      }
      return {
        data: {
          labels: tickRageData.map((d: any) => moment(d.date).format('MM-DD')),
          datasets: [
            {
              label: `Buy `,
              data: tickRageData.map((d: any) =>
                type === 'sheep' ? d.bSheep : d.bShark,
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
              data: tickRageData.map((d: any) =>
                type === 'sheep' ? d.sSheep : d.sShark,
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
