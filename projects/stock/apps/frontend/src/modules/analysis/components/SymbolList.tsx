'use client';

import FromDate from '@modules/analysis/components/FromDate';
import TimeRes from '@modules/analysis/components/TimeRes';
import ToDate from '@modules/analysis/components/ToDate';
import TradeValueFilter from '@modules/analysis/components/TradeValueFilter';
import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import Row from '@src/components/form/Row';
import { withSelectedSymbol } from '@src/modules/analysis/hoc/withSelectedSymbol';
import { combineHOC } from '@web/ui-extension';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';

const AsyncSelect = dynamic(() => import('react-windowed-select'), {
  ssr: false,
});

export default combineHOC(
  withSelectedSymbol,
  withFromToDate,
)((props) => {
  const [value, setValue] = useState<any>();
  useEffect(() => {
    if (value?.value) {
      setTimeout(() => {
        props?.actions?.selectSymbol(value.value);
      });
    }
  }, [value?.value]);

  const corOptions = useMemo(() => {
    if (!Array.isArray(props?.symbols) || props.symbols.length === 0) {
      return [];
    }

    return props.symbols.map((symbol: string) => ({
      value: symbol,
      label: symbol,
    }));
  }, [props.symbols]);

  useEffect(() => {
    if (!value) {
      setValue(corOptions.find((c: any) => c.value === props.state.symbol));
    }
  }, [props?.state?.symbol, value, corOptions]);

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
        {props?.timeRes && <TimeRes />}
      </div>
    </Row>
  );
});
