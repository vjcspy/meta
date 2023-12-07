import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { CommonValue } from '@modules/analysis/value/common.value';
import * as Plot from '@observablehq/plot';
import { combineHOC } from '@web/ui-extension';
import { forEach, reduce } from 'lodash';
import React, { useEffect, useRef } from 'react';

const TickAtPricesChart = combineHOC(withTradeValueFilter)((props) => {
  const containerRef = useRef<any>();

  useEffect(() => {
    if (!Array.isArray(props.ticks) || props.ticks.length === 0) {
      return;
    }
    const filterValue =
      Array.isArray(props?.state?.tradeValueFilter) &&
      props?.state?.tradeValueFilter.length === 3
        ? props?.state?.tradeValueFilter[1]
        : 250;

    const data: any[] = reduce(
      props.ticks ?? [],
      (prev: any[], curr) => {
        if (curr && Array.isArray(curr['meta'])) {
          forEach(curr['meta'], (value: any) => {
            if (value['a'] === 'B') {
              if (value['p'] * value['vol'] > filterValue * 10 ** 6) {
                prev.push({ ...value, a: 'B-SHARK' });
              } else {
                prev.push({ ...value, a: 'B-SHEEP' });
              }
            } else if (value['a'] === 'S') {
              if (value['p'] * value['vol'] > filterValue * 10 ** 6) {
                prev.push({ ...value, a: 'S-SHARK' });
              } else {
                prev.push({ ...value, a: 'S-SHEEP' });
              }
            } else {
              prev.push({
                ...value,
                a: 'S-AT',
                vol: parseInt(String(value.vol / 2)),
              });
              prev.push({
                ...value,
                a: 'B-AT',
                vol: parseInt(String(value.vol / 2)),
              });
            }
          });
        }

        return prev;
      },
      [],
    );

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
  }, [props?.state?.tradeValueFilter, props?.ticks]);

  return (
    <>
      <div ref={containerRef} />
    </>
  );
});

export default TickAtPricesChart;
