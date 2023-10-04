import * as Plot from '@observablehq/plot';
import { combineHOC } from '@web/ui-extension';
import { forEach } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';

import Row from '@/components/form/Row';
import { withSymbolTicks } from '@/hoc/analysis/withSymbolTicks';

const PlotTicks = combineHOC(withSymbolTicks)((props) => {
    const barXType = 1;
    const containerRef = useRef<any>();
    const data = useMemo(() => {
        const _data: any[] = [];

        forEach(props?.state?.ticks, (td: any) => {
            _data.push(...(td?.meta || []));
        });

        return _data;
    }, [props?.state?.ticks]);

    useEffect(() => {
        if (data === undefined) return;
        // const getGroupY = () => {
        //     const a = Plot.groupY(
        //         {
        //             x: (d: any) => {
        //                 //console.log(d);
        //                 const total = d.reduce((i: any, c: any) => {
        //                     if (barXType == 1) {
        //                         return (
        //                             i +
        //                             (c.a == 'B'
        //                                 ? c.vol
        //                                 : c.a == 'S'
        //                                 ? -c.vol
        //                                 : 0)
        //                         );
        //                     } else {
        //                         return (
        //                             i +
        //                             (c.a == 'B'
        //                                 ? c.vol * c.p
        //                                 : c.a == 'S'
        //                                 ? -c.vol * c.p
        //                                 : 0) /
        //                                 10 ** 9
        //                         );
        //                     }
        //                 }, 0);
        //                 //console.log(`Total ${total} price ${d[0].p} ${d[0].a}`);
        //                 return total;
        //             },
        //         },
        //         {
        //             fill: 'a',
        //             y: 'p',
        //         },
        //     );
        //     console.log(a);
        //     return a;
        // };

        const plot = Plot.plot({
            grid: true,
            height: 600,
            color: {
                legend: true,
                domain: ['S', 'B'],
                scheme: 'RdBu',
            },
            x: {
                tickSize: 10,
                axis: 'both',
            },
            y: {
                label: '',
            },
            style: { background: 'transparent' },
            marks: [
                Plot.barX(
                    data.filter((_d) => _d.a != 'Undefined'),
                    Plot.groupY(
                        {
                            x: (d: any) => {
                                //console.log(d);
                                const total = d.reduce((i: any, c: any) => {
                                    if (barXType == 1) {
                                        return (
                                            i +
                                            (c.a == 'B'
                                                ? c.vol
                                                : c.a == 'S'
                                                ? -c.vol
                                                : 0)
                                        );
                                    } else {
                                        return (
                                            i +
                                            (c.a == 'B'
                                                ? c.vol * c.p
                                                : c.a == 'S'
                                                ? -c.vol * c.p
                                                : 0) /
                                                10 ** 9
                                        );
                                    }
                                }, 0);
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

        return () => plot.remove();
    }, [data]);

    return (
        <>
            <Row title="Ticks Chart" containerClassname="grid grid-cols-1">
                <div className="w-screen" ref={containerRef} />
            </Row>
        </>
    );
});

export default PlotTicks;
