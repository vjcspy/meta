import { CommonValue } from '@modules/analysis/value/common.value';
import * as Plot from '@observablehq/plot';
import React, { useEffect, useRef } from 'react';

const TickAtPricesChart = React.memo(
  (props: { ticks: any[]; tradeValueFilter: any; data?: any }) => {
    const containerRef = useRef<any>();
    const { data } = props;
    useEffect(() => {
      if (!data) {
        return;
      }

      const plot = Plot.plot({
        marginTop: 20,
        marginRight: 20,
        marginBottom: 30,
        marginLeft: 140,
        grid: true,
        // height: 600,
        color: {
          legend: true,
          domain: ['B-SHARK', 'B-SHEEP', 'S-SHARK', 'S-SHEEP', 'S-AT', 'B-AT'],
          range: [
            CommonValue.BUY_SHARK_COLOR,
            CommonValue.BUY_SHEEP_COLOR,
            CommonValue.SELL_SHARK_COLOR,
            CommonValue.SELL_SHEEP_COLOR,
            'pink',
            'pink',
          ],
        },
        style: { background: 'transparent' },
        marks: [
          Plot.barX(
            data,
            Plot.groupY(
              {
                x: (d: any) => {
                  //console.log(d);
                  const total = d.reduce(
                    (i: number, c: { a: string; vol: number; p: number }) => {
                      return (
                        i + (c.a[0] == 'B' ? c.vol : c.a[0] == 'S' ? -c.vol : 0)
                      );
                    },
                    0,
                  );
                  //console.log(`Total ${total} price ${d[0].p} ${d[0].a}`);
                  return total;
                },
              },
              {
                fill: 'a',
                y: 'p',
              },
            ),
          ),
        ],
      });

      containerRef.current.append(plot);

      return () => {
        plot.remove();
      };
    }, [data]);

    return (
      <>
        <div ref={containerRef} />
      </>
    );
  },
);

export default TickAtPricesChart;
