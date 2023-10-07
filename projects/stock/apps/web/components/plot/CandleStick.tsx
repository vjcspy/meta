import * as Plot from '@observablehq/plot';
import type { FC } from 'react';
import {useEffect, useMemo, useRef} from 'react';

import Row from '@/components/form/Row';
import {map} from "lodash";
import moment from "moment";

const color = { domain: [-1, 0, 1], range: ['#e41a1c', '#000000', '#4daf4a'] };

const CandleStick: FC<{
    prices_data: any[];
}> = (props) => {
    const containerRef = useRef<any>();

    const chartData = useMemo(()=>{
        return map(props.prices_data,(_d:any)=> {
            const date = moment(_d.date).utc().toDate();
            console.log(date);
            return ({..._d, date});
        });
    },[props.prices_data])

    useEffect(() => {
        const plot = Plot.plot({
            inset: 6,
            grid: true,
            style: {width: "100%",background: 'transparent' },
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
                //     aapl,
                //     Plot.selectFirst({
                //         y: (d) => d.Open,
                //         stroke: 'grey',
                //         strokeDasharray: '3,2',
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
            ],
        });
        containerRef.current.append(plot);
        return () => plot.remove();
    }, [chartData]);

    return (
        <>
            <Row
                title="Ticks Chart"
                containerClassname="grid grid-cols-1"
                showExpanded={false}
            >
                <div ref={containerRef} />
            </Row>
        </>
    );
};

export default CandleStick;
