'use client';

import FromDate from '@modules/analysis/components/FromDate';
import ToDate from '@modules/analysis/components/ToDate';
import TradeValueFilter from '@modules/analysis/components/TradeValueFilter';
import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import Row from '@src/components/form/Row';
import { withCors } from '@src/modules/analysis/hoc/withCors';
import { withSelectedSymbol } from '@src/modules/analysis/hoc/withSelectedSymbol';
import { combineHOC } from '@web/ui-extension';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

const AsyncSelect = dynamic(() => import('react-windowed-select'), {
  ssr: false,
});

const Symbol = combineHOC(
  withCors,
  withSelectedSymbol,
  withFromToDate,
)((props) => {
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
    if (!value) {
      setValue(corOptions.find((c: any) => c.value === props.state.symbol));
    }
  }, [props?.state?.symbol, value, corOptions]);

  useEffect(() => {
    if (value?.value) {
      setTimeout(() => {
        props?.actions?.selectSymbol(value.value);
      });
    }
  }, [value?.value]);

  return (
    <Row title={`${value?.label ?? 'Chưa chọn mã'}`} oneCol={false}>
      <div className="custom-select grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label>Symbol</label>
          <AsyncSelect
            windowThreshold={100}
            placeholder="Select an symbol"
            options={corOptions}
            onChange={setValue}
            value={value}
          />
        </div>
        {props?.fromDate && <FromDate />}
        {props?.toDate && <ToDate />}
        {props?.tradeValue && <TradeValueFilter />}
      </div>
    </Row>
  );
});

export default Symbol;
