import { combineHOC } from '@web/ui-extension';
import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';

import Row from '@/components/form/Row';
import { withCorsHOC } from '@/hoc/analysis/withCors';
import { withSelectedSymbol } from '@/hoc/analysis/withSelectedSymbol';
import { withSymbolPrice } from '@/hoc/analysis/withSymbolPrice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { analysisActions } from '@/store/analysis.slice';

const Symbol = combineHOC(
    withCorsHOC,
    withSelectedSymbol,
    withSymbolPrice,
)((props) => {
    const dispatch = useAppDispatch();
    const corOptions = useMemo(() => {
        return props.state.cors.map((c: any) => ({
            value: c.code,
            label: c.code,
        }));
    }, [props.state.cors]);

    const [value, setValue] = useState<any>();

    useEffect(() => {
        setValue(
            corOptions.find((c: any) => c.value === props.state.symbol) as any,
        );
    }, [props.state.symbol, corOptions]);

    return (
        <Row title={`Symbol: ${value?.label}`}>
            <Select
                placeholder="Select an symbol"
                options={corOptions}
                onChange={(choice) => {
                    dispatch(
                        analysisActions.setSymbol({
                            symbol: choice?.value,
                        }),
                    );
                }}
                value={value}
            />
        </Row>
    );
});

export default Symbol;
