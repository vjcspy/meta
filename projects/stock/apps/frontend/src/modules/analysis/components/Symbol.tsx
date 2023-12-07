'use client';

import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { withThemState } from '@modules/app/hoc/withThemState';
import Row from '@src/components/form/Row';
import { withCors } from '@src/modules/analysis/hoc/withCors';
import { withSelectedSymbol } from '@src/modules/analysis/hoc/withSelectedSymbol';
import { combineHOC } from '@web/ui-extension';
import Slider from 'antd/es/slider';
import { debounce } from 'lodash';
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
  withTradeValueFilter,
  withThemState,
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

  const debounceUpdateTradeValue = useMemo(() => {
    return debounce((data: any) => {
      props?.actions?.setTradeValueFilterAction(data);
    }, 1000);
  }, []);

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
        {props?.tradeValue && (
          <div>
            <label>
              Trade Value:
              <span className="font-bold text-red-500">{` ${props?.state?.tradeValueFilter?.[1]} triệu`}</span>
            </label>
            <div className="mt-5">
              <Slider
                range
                max={1000}
                min={0}
                defaultValue={props?.state?.tradeValueFilter ?? 250}
                onChange={debounceUpdateTradeValue}
                styles={{
                  rail: {
                    backgroundColor: props?.state.themeState.isDarkMode
                      ? 'white'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Row>
  );
});

export default Symbol;
