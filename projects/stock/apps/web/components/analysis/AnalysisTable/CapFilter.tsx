import { combineHOC } from '@web/ui-extension';
import { debounce, forEach } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Row from '@/components/form/Row';
import { withAnalysisData } from '@/hoc/analysis/withAnalysisData';

const CapFilter = combineHOC(withAnalysisData)((props) => {
    const [cap, setCap] = useState(0);
    const onChange = useCallback((e: any) => {
        if (Number.isNaN(e?.target?.value)) {
            return;
        }
        setCap(e.target.value as any);
    }, []);

    const debouncedSetFilterTradeValue = useRef(
        debounce((newValue) => {
            props.actions.setCapFilter(newValue);
        }, 50),
    );

    useEffect(() => {
        debouncedSetFilterTradeValue.current(cap);

        // Dọn dẹp khi unmount để hủy bỏ bất kỳ lời gọi nào còn đang chờ
        return () => {
            debouncedSetFilterTradeValue.current.cancel();
        };
    }, [cap]);

    const capFilterInfo = useMemo(() => {
        let min = -1,
            max = 0;

        forEach(props.state.analysis, (a) => {
            if (a.cap < min || min == -1) {
                min = a.cap;
            }

            if (a.cap > max || max === 0) {
                max = a.cap;
            }
        });

        return {
            min,
            max,
        };
    }, [props.state.analysis]);
    if (props.state.analysis.length === 0) {
        return <></>;
    }

    return (
        <>
            <Row title={`Capitalization: ${cap} tỷ VND`}>
                <div>
                    <div className="font-bold">
                        <span className="inline-block rounded border border-white-light px-2 py-1 text-primary dark:border-dark">
                            {cap}
                        </span>
                        <span> tỷ VND</span>
                    </div>
                    <input
                        type="range"
                        className="w-full py-2.5"
                        value={cap}
                        min={capFilterInfo.min}
                        max={capFilterInfo.max}
                        onChange={onChange}
                    />
                </div>
            </Row>
        </>
    );
});

export default CapFilter;
