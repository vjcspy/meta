import { combineHOC } from '@web/ui-extension';
import { debounce } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Row from '@/components/form/Row';
import { withFilterTradeValue } from '@/hoc/analysis/withFilterTradeValue';

const FilterTradeValue = combineHOC(withFilterTradeValue)((props) => {
    const [value, setValue] = useState(props.state.filterTradeValue);
    const onChange = useCallback((e: any) => {
        if (Number.isNaN(e?.target?.value)) {
            return;
        }
        setValue(e.target.value as any);
    }, []);

    const debouncedSetFilterTradeValue = useRef(
        debounce((newValue) => {
            props.actions.setFilterTradeValue(newValue);
        }, 50),
    );

    useEffect(() => {
        debouncedSetFilterTradeValue.current(value);

        // Dọn dẹp khi unmount để hủy bỏ bất kỳ lời gọi nào còn đang chờ
        return () => {
            debouncedSetFilterTradeValue.current.cancel();
        };
    }, [value]);

    const valueTitle = useMemo(() => props?.valueTitle ?? 'triệu', []);

    return (
        <>
            <Row title={`Trade value: ${value} ${valueTitle} VND`}>
                <div>
                    <div className="font-bold">
                        <span className="inline-block rounded border border-white-light px-2 py-1 text-primary dark:border-dark">
                            {value}
                        </span>
                        <span> {valueTitle} VND</span>
                    </div>
                    <input
                        type="range"
                        className="w-full py-2.5"
                        value={value}
                        min={0}
                        max={1000}
                        onChange={onChange}
                    />
                </div>
            </Row>
        </>
    );
});

export default FilterTradeValue;
