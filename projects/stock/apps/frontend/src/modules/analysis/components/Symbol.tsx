'use client';

import Row from '@src/components/form/Row';
import { withCors } from '@src/modules/analysis/hoc/withCors';
import { withSelectedSymbol } from '@src/modules/analysis/hoc/withSelectedSymbol';
import { ANALYSIS_ACTIONS } from '@src/modules/analysis/store/analysis.actions';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { combineHOC } from '@web/ui-extension';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { createFilter } from 'react-select';

const AsyncSelect = dynamic(() => import('react-windowed-select'), {
  ssr: false,
});

const Symbol = combineHOC(
  withCors,
  withSelectedSymbol,
)((props) => {
  const dispatch = useAppDispatch();
  const corOptions = useMemo(() => {
    return props.state.cors
      ? props.state.cors.map((c: any) => ({
          value: c.code,
          label: c.code,
        }))
      : [];
  }, [props.state.cors]);

  const [value, setValue] = useState<any>();

  useEffect(() => {
    if (props.state.symbol) {
      setValue(
        corOptions.find((c: any) => c.value === props.state.symbol) as any,
      );
    }
  }, [props.state.symbol, corOptions]);

  return (
    <Row title={`Symbol: ${value?.label ?? 'Chưa chọn mã'}`}>
      <AsyncSelect
        windowThreshold={100}
        placeholder="Select an symbol"
        options={corOptions}
        filterOption={createFilter({ ignoreAccents: false })}
        onChange={(choice: any) => {
          dispatch(
            ANALYSIS_ACTIONS.setSymbol({
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
