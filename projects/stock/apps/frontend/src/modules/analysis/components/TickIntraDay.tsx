'use client';

import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withRefreshTicks } from '@modules/analysis/hoc/withRefreshTick';
import { withTickIntraDay } from '@modules/analysis/hoc/withTickIntraDay';
import { getTimeResolutionOptions } from '@modules/analysis/util/getTimeResolutionOptions';
import { CommonValue } from '@modules/analysis/value/common.value';
import { withThemState } from '@modules/app/hoc/withThemState';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { TIMEZONE } from '@src/value/common.value';
import {
  mergeByRes,
  TimeResolution,
} from '@stock/packages-com/dist/tick/merge-by-res';
import { combineHOC } from '@web/ui-extension';
import Slider from 'antd/es/slider';
import moment from 'moment/moment';
import momentTimezone from 'moment-timezone';
import { useCallback, useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Flatpickr from 'react-flatpickr';

const TickIntraDay = combineHOC(
  withTickIntraDay,
  withFromToDate,
  withThemState,
  withRefreshTicks,
)((props) => {
  const [showChartType, setShowChartType] = useState('3');
  const [tradeVal, setTradeVal] = useState([0, 350, 1000]);
  const [timeRes, setTimeRes] = useState<TimeResolution>(TimeResolution['3M']);
  const onChange = useCallback(
    (dates: any) => {
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
        return momentTimezone.unix(meta[0]['ts']).tz(TIMEZONE);
      }
    }

    return undefined;
  }, [props.state.tickIntraDay]);

  const chartJsConfig: any = useMemo(() => {
    if (
      !Array.isArray(props.state?.tickIntraDay?.meta) ||
      props.state?.tickIntraDay.meta.length === 0
    ) {
      return undefined;
    }
    const date = moment().utc(props.state.tickIntraDay['date']);
    const meta = props.state.tickIntraDay.meta;
    let datasets = [];
    let labels: any;
    if (showChartType === '1') {
      const mergedByTimeStamp = mergeByRes(meta, date, timeRes, {
        min: Number(tradeVal[0]),
        max: Number(tradeVal[1]),
      });
      datasets = [
        {
          label: `Buy < ${Number(tradeVal[1])}`,
          data: mergedByTimeStamp.map((d: any) => d.buy),
          fill: false,
          borderColor: CommonValue.BUY_SHEEP_COLOR,
          tension: 0,
        },
        {
          label: `Sell < ${Number(tradeVal[1])}`,
          data: mergedByTimeStamp.map((d: any) => d.sell),
          fill: false,
          borderColor: CommonValue.SELL_SHEEP_COLOR,
          tension: 0,
        },
      ];
      labels = mergedByTimeStamp.map((d: any) => {
        return momentTimezone.unix(d.ts).tz(TIMEZONE).format('HH:mm:ss');
      });
    } else if (showChartType === '2') {
      const mergedByTimeStamp = mergeByRes(meta, date, timeRes, {
        min: Number(tradeVal[1]),
        max: Number(tradeVal[2]),
      });
      datasets = [
        {
          label: `Buy > ${Number(tradeVal[1])}`,
          data: mergedByTimeStamp.map((d: any) => d.buy),
          fill: false,
          borderColor: CommonValue.BUY_SHARK_COLOR,
          tension: 0,
        },
        {
          label: `Sell > ${Number(tradeVal[1])}`,
          data: mergedByTimeStamp.map((d: any) => d.sell),
          fill: false,
          borderColor: CommonValue.SELL_SHARK_COLOR,
          tension: 0,
        },
      ];
      labels = mergedByTimeStamp.map((d: any) => {
        return momentTimezone.unix(d.ts).tz(TIMEZONE).format('HH:mm:ss');
      });
    } else {
      const mergedByTimeStamp1 = mergeByRes(meta, date, timeRes, {
        min: Number(tradeVal[0]),
        max: Number(tradeVal[1]),
      });
      const mergedByTimeStamp2 = mergeByRes(meta, date, timeRes, {
        min: Number(tradeVal[1]),
        max: Number(tradeVal[2]),
      });
      labels = mergedByTimeStamp2.map((d: any) => {
        return momentTimezone.unix(d.ts).tz(TIMEZONE).format('HH:mm:ss');
      });
      datasets = [
        {
          label: `Buy < ${Number(tradeVal[1])}`,
          data: mergedByTimeStamp1.map((d: any) => d.buy),
          fill: false,
          borderColor: CommonValue.BUY_SHEEP_COLOR,
          tension: 0,
        },
        {
          label: `Sell < ${Number(tradeVal[1])}`,
          data: mergedByTimeStamp1.map((d: any) => d.sell),
          fill: false,
          borderColor: CommonValue.SELL_SHEEP_COLOR,
          tension: 0,
        },
        {
          label: `Buy > ${Number(tradeVal[1])}`,
          data: mergedByTimeStamp2.map((d: any) => d.buy),
          fill: false,
          borderColor: CommonValue.BUY_SHARK_COLOR,
          tension: 0,
        },
        {
          label: `Sell > ${Number(tradeVal[1])}`,
          data: mergedByTimeStamp2.map((d: any) => d.sell),
          fill: false,
          borderColor: CommonValue.SELL_SHARK_COLOR,
          tension: 0,
        },
      ];
    }

    return {
      data: {
        labels,
        datasets,
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
    };
  }, [props.state.tickIntraDay, timeRes, showChartType, tradeVal]);

  const onTimeResChange = useCallback((e: any) => {
    setTimeRes(e.target.value);
  }, []);

  return (
    <Row
      title={`Tick intra day. Last tick: ${
        lastTickMoment
          ? lastTickMoment.format('YYYY-MM-DD HH:mm:ss')
          : 'undefined'
      }`}
      oneCol={false}
    >
      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
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
        <div>
          <label>Number of type</label>
          <select
            value={showChartType}
            className="form-select text-white-dark"
            onChange={(e) => {
              setShowChartType(e?.target.value);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">All</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
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
        <div>
          <label>
            Trade Value:
            <span className="font-bold text-red-500">{` ${tradeVal[1]}`}</span>
          </label>
          <div className="mt-5">
            <Slider
              range
              max={1000}
              defaultValue={tradeVal}
              onChange={setTradeVal}
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
      </div>
      <div className="grid grid-cols-1 gap-6 pt-2">
        <label className="pt-6">Mua bán theo thời gian</label>
        <ChartJSPlugins plugins={['zoom']}>
          {chartJsConfig && <Line {...chartJsConfig} />}
        </ChartJSPlugins>
      </div>
    </Row>
  );
});

export default TickIntraDay;
