'use client';

import TimeRes from '@modules/analysis/components/TimeRes';
import ToDate from '@modules/analysis/components/ToDate';
import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withRefreshTicks } from '@modules/analysis/hoc/withRefreshTick';
import { withTickIntraDay } from '@modules/analysis/hoc/withTickIntraDay';
import withTimeRes from '@modules/analysis/hoc/withTimeRes';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { CHARTJS_INTRADAY_OPTIONS } from '@modules/analysis/value/chartjs.value';
import { CommonValue } from '@modules/analysis/value/common.value';
import { withThemState } from '@modules/app/hoc/withThemState';
import ChartJSPlugins from '@src/components/chartjs/ChartJSPlugins';
import Row from '@src/components/form/Row';
import { TIMEZONE } from '@src/value/common.value';
import { mergeByRes } from '@stock/packages-com/dist/tick/merge-by-res';
import { combineHOC } from '@web/ui-extension';
import moment from 'moment/moment';
import momentTimezone from 'moment-timezone';
import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';

const TickIntraDay = combineHOC(
  withTickIntraDay,
  withFromToDate,
  withThemState,
  withRefreshTicks,
  withTradeValueFilter,
  withTimeRes,
)((props) => {
  const timeRes = props.state.timeRes;
  const [showChartType, setShowChartType] = useState('3');

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
      props.state?.tickIntraDay.meta.length === 0 ||
      !Array.isArray(props?.state?.tradeValueFilter) ||
      props?.state?.tradeValueFilter.length !== 3
    ) {
      return undefined;
    }
    const date = moment().utc(props.state.tickIntraDay['date']);
    const meta = props.state.tickIntraDay.meta;
    const tradeVal = props.state.tradeValueFilter;
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
        return momentTimezone.unix(d.ts).tz(TIMEZONE).format('HH:mm');
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
        return momentTimezone.unix(d.ts).tz(TIMEZONE).format('HH:mm');
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
        return momentTimezone.unix(d.ts).tz(TIMEZONE).format('HH:mm');
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
        {
          label: `Close`,
          data: mergedByTimeStamp2.map((d: any) => d.open),
          fill: false,
          borderColor: 'white',
          tension: 0,
          borderWidth: 0.5,
          yAxisID: 'y1',
        },
      ];
    }

    return {
      data: {
        labels,
        datasets,
      },
      options: {
        ...CHARTJS_INTRADAY_OPTIONS,
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        },
      },
    };
  }, [
    props.state.tickIntraDay,
    timeRes,
    showChartType,
    props?.state?.tradeValueFilter,
  ]);

  return (
    <Row
      title={`Tick intra day. Last tick: ${
        lastTickMoment
          ? lastTickMoment.format('YYYY-MM-DD HH:mm:ss')
          : 'undefined'
      }`}
      oneCol={false}
    >
      <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-6">
        <ToDate />
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
        <TimeRes />
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
