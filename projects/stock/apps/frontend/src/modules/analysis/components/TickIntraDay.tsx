'use client';

import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withTickIntraDay } from '@modules/analysis/hoc/withTickIntraDay';
import * as Plot from '@observablehq/plot';
import Row from '@src/components/form/Row';
import { TIMEZONE } from '@src/value/common.value';
import {
  mergeByRes,
  TimeResolution,
} from '@stock/packages-com/dist/tick/merge-by-res';
import { combineHOC } from '@web/ui-extension';
import moment from 'moment/moment';
import momentTimezone from 'moment-timezone';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';

const TickIntraDay = combineHOC(
  withTickIntraDay,
  withFromToDate,
)((props) => {
  const containerRef = useRef<any>();
  const [timeRes, setTimeRes] = useState<TimeResolution>(TimeResolution['3M']);
  const onChange = useCallback(
    (dates: any) => {
      // props.actions.setFromDate
      if (Array.isArray(dates) && dates.length == 1) {
        props.actions.setToDate(moment(dates[0]).format('YYYY-MM-DD'));
      }
    },
    [props.actions.setToDate],
  );

  const lastTickMoment = useMemo(() => {
    if (props.state.tickIntraDay) {
      const meta = props.state.tickIntraDay.meta;

      if (Array.isArray(meta)) {
        const time = moment.unix(meta[0]['ts']);
        momentTimezone.tz(time, 'Asia/Ho_Chi_Minh');

        return time;
      }
    }

    return undefined;
  }, [props.state.tickIntraDay]);

  const mergedByTimeStamp = useMemo(() => {
    if (props.state.tickIntraDay) {
      const date = moment().utc(props.state.tickIntraDay['date']);
      const meta = props.state.tickIntraDay.meta;
      if (Array.isArray(meta)) {
        return mergeByRes(meta, date, timeRes);
      }
    }

    return [];
  }, [props.state.tickIntraDay, timeRes]);

  useEffect(() => {
    const plot = Plot.plot({
      inset: 6,
      grid: true,
      style: { width: '100%', background: 'transparent', padding: '5px' },
      y: {
        label: `Mua bán theo thời gian`,
      },
      // x: {
      //     tickFormat: 'm/d',
      //     label: null,
      // },
      // color,
      marks: [
        // Plot.ruleY(
        //     chartData,
        //     Plot.selectFirst({
        //         y: (d) => d.close,
        //         stroke: 'grey',
        //         strokeDasharray: '1,2',
        //     }),
        // ),
        Plot.lineY(mergedByTimeStamp, {
          x: {
            value: (d: any, _i: number) => {
              const mm = momentTimezone.unix(d.ts).tz(TIMEZONE);
              return mm.toDate();
            },
          },
          y: 'buy',
          stroke: '#4e79a7',
          strokeWidth: 0.5,
        }),
      ],
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [mergedByTimeStamp]);

  return (
    <Row
      title={`Tick intra day. Last tick: ${
        lastTickMoment
          ? lastTickMoment.format('YYYY-MM-DD HH:mm:ss')
          : 'undefined'
      }`}
      oneCol={false}
    >
      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-3 lg:grid-cols-6">
        <div className="mb-5">
          <label>Date</label>
          <Flatpickr
            value={props.state.toDate}
            options={{
              dateFormat: 'Y-m-d',
              position: 'auto left',
            }}
            className="form-input"
            onChange={onChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-3 lg:grid-cols-6">
        <div>
          <label>Time Resolution</label>
          <select className="form-select text-white-dark">
            <option>Open this select menu</option>
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
          </select>
        </div>
        {/*<div>*/}
        {/*  <label>Default Input</label>*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    placeholder="Default Input"*/}
        {/*    className="form-input"*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
      <div className="grid grid-cols-1 gap-6 pt-2">
        <div ref={containerRef} />
      </div>
    </Row>
  );
});

export default TickIntraDay;
