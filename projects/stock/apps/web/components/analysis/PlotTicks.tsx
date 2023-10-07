import * as Plot from '@observablehq/plot';
import { combineHOC } from '@web/ui-extension';
import { forEach } from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import Select from 'react-select';

import Row from '@/components/form/Row';
import { withFilterTradeValue } from '@/hoc/analysis/withFilterTradeValue';
import { withSymbolTicks } from '@/hoc/analysis/withSymbolTicks';

const barXTypeOptions = [
    { value: 'vol', label: 'Volume' },
    { value: 'val', label: 'Value' },
];

const PlotTicks = combineHOC(
    withSymbolTicks,
    withFilterTradeValue,
)((props) => {
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

        const _data: any[] = [];
        forEach(data, (_d) => {
            if (_d.a == 'Undefined') {
                _data.push({ ..._d, a: 'ATC_S' });
                _data.push({ ..._d, a: 'ATC_B' });
            } else if (_d.a == 'B' || _d.a == 'S') {
                _data.push(_d);
            } else {
                console.warn('ticks data invalid');
            }
        });

        const plot = Plot.plot({
            grid: true,
            height: 600,
            color: {
                legend: true,
                domain: ['S', 'B', 'ATC_S', 'ATC_B'],
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
                    _data,
                    Plot.groupY(
                        {
                            x: (d: any) => {
                                //console.log(d);
                                const total = d.reduce((i: any, c: any) => {
                                    const value = c.vol * c.p;

                                    // Filter trade value
                                    if (
                                        !Number.isNaN(
                                            props?.state?.filterTradeValue,
                                        ) &&
                                        props?.state?.filterTradeValue > 0
                                    ) {
                                        if (
                                            value <
                                            props?.state?.filterTradeValue *
                                                10 ** 6
                                        ) {
                                            return i;
                                        }
                                    }

                                    if (barXTypeValue.value === 'vol') {
                                        return (
                                            i +
                                            (c.a == 'B' || c.a == 'ATC_B'
                                                ? c.vol
                                                : c.a == 'S' || c.a == 'ATC_S'
                                                ? -c.vol
                                                : 0)
                                        );
                                    } else {
                                        return (
                                            i +
                                            (c.a == 'B' || c.a == 'ATC_B'
                                                ? value
                                                : c.a == 'S' || c.a == 'ATC_S'
                                                ? -value
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
    }, [data, barXTypeValue, props.state.filterTradeValue]);

    return (
        <>
            <Row
                title="Ticks Chart"
                containerClassname="grid grid-cols-1"
                showExpanded={false}
            >
                <div className="custom-select mb-5 grid grid-cols-1 gap-6 pt-2 md:grid-cols-3 lg:grid-cols-6">
                    <Select
                        value={barXTypeValue}
                        options={barXTypeOptions}
                        isSearchable={false}
                        onChange={(o: any) => setBarXTypeValue(o)}
                    />
                </div>
                <div ref={containerRef} />
            </Row>
        </>
    );
});

export default PlotTicks;
