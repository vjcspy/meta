import * as Plot from '@observablehq/plot';
import { combineHOC } from '@web/ui-extension';
import { forEach } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';

import Row from '@/components/form/Row';
import { withSymbolTicks } from '@/hoc/analysis/withSymbolTicks';

const barXTypeOptions = [
    { value: 'vol', label: 'Volume' },
    { value: 'val', label: 'Value' },
];

const PlotTicks = combineHOC(withSymbolTicks)((props) => {
    const [barXTypeValue, setBarXTypeValue] = useState(barXTypeOptions[1]);
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
                                    if (barXTypeValue.value === 'vol') {
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
    }, [data, barXTypeValue]);

    return (
        <>
            <Row
                title="Ticks Chart"
                containerClassname="grid grid-cols-1"
                showExpanded={false}
            >
                <div className="custom-select grid grid-cols-1 gap-6 pt-2 md:grid-cols-3 lg:grid-cols-6 mb-5">
                    <Select
                        value={barXTypeValue}
                        options={barXTypeOptions}
                        isSearchable={false}
                        onChange={(o: any) => setBarXTypeValue(o)}
                    />
                </div>
                <div className="w-screen" ref={containerRef} />
            </Row>
        </>
    );
});

export default PlotTicks;
