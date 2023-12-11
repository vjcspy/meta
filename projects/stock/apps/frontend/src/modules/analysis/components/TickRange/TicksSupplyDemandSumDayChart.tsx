import { CommonValue } from '@modules/analysis/value/common.value';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
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
                type === 'sheep' ? d.sBSheep : d.sBShark,
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
                type === 'sheep' ? d.sSSheep : d.sSShark,
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
              data: tickRageData.map((d: any) =>
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
            title={`Mua bán cộng dồn - ${type === 'sheep' ? 'SHEEP' : 'SHARK'}`}
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
