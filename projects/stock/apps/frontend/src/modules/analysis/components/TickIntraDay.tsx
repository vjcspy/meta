'use client';

import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withTickIntraDay } from '@modules/analysis/hoc/withTickIntraDay';
import { getTimeResolutionOptions } from '@modules/analysis/util/getTimeResolutionOptions';
import Row from '@src/components/form/Row';
import { TIMEZONE } from '@src/value/common.value';
import {
  mergeByRes,
  TimeResolution,
} from '@stock/packages-com/dist/tick/merge-by-res';
import { combineHOC } from '@web/ui-extension';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';
import moment from 'moment/moment';
import momentTimezone from 'moment-timezone';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Flatpickr from 'react-flatpickr';

const TickIntraDay = combineHOC(
  withTickIntraDay,
  withFromToDate,
)((props) => {
  useEffect(() => {
    // @ts-ignore
    Chart?.register(zoomPlugin);
  }, []);

  const chartRef = useRef<any>();
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
        console.log(meta[0]['ts']);
        const time = momentTimezone.unix(meta[0]['ts']).tz(TIMEZONE);
        console.log(time);
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
    if (!chartRef.current) {
      return;
    }

    const ctx = chartRef.current.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: mergedByTimeStamp.map((d: any) => {
          return momentTimezone.unix(d.ts).tz(TIMEZONE).format('HH:mm:ss');
        }),
        datasets: [
          {
            label: 'Buy Vol',
            data: mergedByTimeStamp.map((d: any) => d.buy),
            fill: false,
            borderColor: 'rgb(46,60,208)',
            tension: 0,
          },
          {
            label: 'Sell Vol',
            data: mergedByTimeStamp.map((d: any) => d.sell),
            fill: false,
            borderColor: 'rgb(203,52,52)',
            tension: 0,
          },
          // {
          //   label: 'OC',
          //   data: mergedByTimeStamp.map((d: any) => d.oc),
          //   fill: false,
          //   borderColor: 'rgb(255,255,255)',
          //   tension: 0,
          // },
        ],
      },
      options: {
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: false,
              },
              mode: 'x',
              // scaleMode: 'y',
              overScaleMode: 'x',
            },
            pan: {
              enabled: true,
              mode: 'x',
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        myChart.destroy();
      }
    };
  }, [mergedByTimeStamp]);

  const onTimeResChange = useCallback((e: any) => {
    setTimeRes(e.target.value);
  }, []);

  console.log(lastTickMoment);

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
          <select
            value={timeRes}
            className="form-select text-white-dark"
            onChange={onTimeResChange}
          >
            {getTimeResolutionOptions().map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
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
        <label className="pt-6">Mua bán theo thời gian</label>
        <canvas ref={chartRef}></canvas>
      </div>
    </Row>
  );
});

export default TickIntraDay;
