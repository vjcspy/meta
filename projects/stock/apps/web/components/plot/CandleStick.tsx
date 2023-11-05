import * as Plot from '@observablehq/plot';
import { filter, map } from 'lodash';
import type { FC } from 'react';
import { useEffect, useMemo, useRef } from 'react';

import Row from '@/components/form/Row';

const color = { domain: [-1, 0, 1], range: ['#e41a1c', '#000000', '#4daf4a'] };

const CandleStick: FC<{
    prices_data: any[];
    title?: string;
}> = (props) => {
    const containerRef = useRef<any>();

    const chartData = useMemo(() => {
        let index = 0;
        return map(props.prices_data, (_d: any) => {
            // const date = moment(_d.date).utc().toDate();
            return { ..._d, date: --index };
        });
    }, [props.prices_data]);

    useEffect(() => {
        const plot = Plot.plot({
            inset: 6,
            grid: true,
            style: { width: '100%', background: 'transparent' },
            y: {
                label: `Biểu đồ nến`,
            },
            // x: {
            //     tickFormat: 'm/d',
            //     label: null,
            // },
            color,
            marks: [
                // Plot.ruleY(
                //     chartData,
                //     Plot.selectFirst({
                //         y: (d) => d.close,
                //         stroke: 'grey',
                //         strokeDasharray: '1,2',
                //     }),
                // ),
                Plot.ruleX(chartData, {
                    x: 'date',
                    y1: 'low',
                    y2: 'high',
                }),
                Plot.ruleX(chartData, {
                    x: 'date',
                    y1: 'open',
                    y2: 'close',
                    stroke: (d: any) => Math.sign(d.close - d.open),
                    strokeWidth: 4,
                    strokeLinecap: 'round',
                }),
                Plot.line(
                    filter(chartData, (d) => !isNaN(d['hullma'])),
                    {
                        x: 'date',
                        y: 'hullma',
                        z: null,
                        stroke: 'hullma_trend',
                    },
                ),
            ],
        });
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [chartData]);

    return (
        <>
            <Row
                title={props.title ?? 'Ticks Chart'}
                containerClassname="grid grid-cols-1"
                showExpanded={false}
            >
                <div ref={containerRef} />
            </Row>
        </>
    );
};

export default CandleStick;
