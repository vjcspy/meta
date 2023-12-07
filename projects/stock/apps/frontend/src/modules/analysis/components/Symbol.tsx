'use client';

import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import Row from '@src/components/form/Row';
import { withCors } from '@src/modules/analysis/hoc/withCors';
import { withSelectedSymbol } from '@src/modules/analysis/hoc/withSelectedSymbol';
import { ANALYSIS_ACTIONS } from '@src/modules/analysis/store/analysis.actions';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { combineHOC } from '@web/ui-extension';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';

const AsyncSelect = dynamic(() => import('react-windowed-select'), {
  ssr: false,
});

const Symbol = combineHOC(
  withCors,
  withSelectedSymbol,
  withFromToDate,
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

  const onFromDateChange = useCallback(
    (dates: any) => {
      if (Array.isArray(dates) && dates.length == 1) {
        props?.actions?.setFromDate(moment(dates[0]).format('YYYY-MM-DD'));
      }
    },
    [props?.actions?.setToDate],
  );

  const onToDateChange = useCallback(
    (dates: any) => {
      if (Array.isArray(dates) && dates.length == 1) {
        props?.actions?.setToDate(moment(dates[0]).format('YYYY-MM-DD'));
      }
    },
    [props?.actions?.setToDate],
  );

  return (
    <Row title={`${value?.label ?? 'Chưa chọn mã'}`} oneCol={false}>
      <div className="custom-select grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label>Symbol</label>
          <AsyncSelect
            windowThreshold={100}
            placeholder="Select an symbol"
            options={corOptions}
            onChange={(choice: any) => {
              dispatch(
                ANALYSIS_ACTIONS.setSymbol({
                  symbol: choice?.value,
                }),
              );
            }}
            value={value}
          />
        </div>
        {props?.fromDate && (
          <div>
            <label>From Date</label>
            <Flatpickr
              value={props.state.fromDate}
              options={{
                dateFormat: 'Y-m-d',
                position: 'auto left',
              }}
              className="form-input"
              onChange={onFromDateChange}
            />
          </div>
        )}
        {props?.toDate && (
          <div>
            <label>To Date</label>
            <Flatpickr
              value={props.state.toDate}
              options={{
                dateFormat: 'Y-m-d',
                position: 'auto left',
              }}
              className="form-input"
              onChange={onToDateChange}
            />
          </div>
        )}
      </div>
    </Row>
  );
});

export default Symbol;
