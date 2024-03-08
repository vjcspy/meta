'use client';

import withMarketIntraDayChartData from '@modules/analysis/hoc/market-intra-day/withMarketIntraDayChartData';
import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import { TIMEZONE } from '@src/value/common.value';
import { combineHOC } from '@web/ui-extension/dist';
import Search from 'antd/es/input/Search';
import Table, { type ColumnsType } from 'antd/es/table';
import { forEach, round } from 'lodash-es';
import momentTimezone from 'moment-timezone';
import React, { useEffect, useMemo, useState } from 'react';

interface DataType {
  symbol: string;
  ts: number;
  type: string;
  m: number;
}

export default combineHOC(withMarketIntraDayChartData)((props) => {
  const [symbolSearch, setSymbolSearch] = useState<string>();
  const { sellRate, buyRate } = props;
  const [dataSource, setDataSource] = useState<any>();
  const columns = useMemo(() => {
    const col: ColumnsType<DataType> = [
      {
        title: 'symbol',
        dataIndex: 'symbol',
        key: 'symbol',
        fixed: 'left',
        width: 100,
      },
      {
        title: 'ts',
        dataIndex: 'ts',
        key: 'ts',
        sorter: (a, b) => a.ts - b.ts,
        render: (value) => {
          return momentTimezone.unix(value).tz(TIMEZONE).format('HH:mm');
        },
        width: 70,
      },
      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
        sorter: (a, b) => a.type.localeCompare(b.type),
        width: 70,
        filters: [
          {
            text: 'SHARK BUY',
            value: 'SHARK_BUY',
          },
          {
            text: 'SHARK_SELL',
            value: 'SHARK_SELL',
          },
          {
            text: 'SHEEP BUY',
            value: 'SHEEP_BUY',
          },
          {
            text: 'SHEEP SELL',
            value: 'SHEEP_SELL',
          },
        ],
        onFilter: (value: any, record) => record.type === value,
      },
      {
        title: 'm',
        dataIndex: 'm',
        key: 'm',
        sorter: (a, b) => a.m - b.m,
        width: 70,
      },
    ];

    return col;
  }, []);

  useEffect(() => {
    if (props.state.chartData) {
      const data: any[] = [];
      forEach(
        props.state.chartData.currentIntraDayDataByTick,
        (values, symbol) => {
          if (symbolSearch && symbol.indexOf(symbolSearch.toUpperCase()) < 0) {
            return true;
          }

          const analysis = MarketIntraDay.ticks.find(
            (t) => t.symbol === symbol,
          )?.analysis;
          if (!analysis) {
            console.warn(`could not found analysis for symbol ${symbol}`);

            return false;
          }
          const deal_value_5 = analysis.deal_value_5 * 10 ** 6;
          forEach(values, (value) => {
            if (value.shark_sell > (deal_value_5 * sellRate) / 100) {
              data.push({
                ts: value.ts,
                symbol,
                m: round(value.shark_sell / deal_value_5, 2),
                type: 'SHARK_SELL',
              });
            }

            if (value.sheep_sell > (deal_value_5 * sellRate) / 100) {
              data.push({
                ts: value.ts,
                symbol,
                m: round(value.sheep_sell / deal_value_5, 2),
                type: 'SHEEP_SELL',
              });
            }
            if (value.shark_buy > (deal_value_5 * sellRate) / 100) {
              data.push({
                ts: value.ts,
                symbol,
                m: round(value.shark_buy / deal_value_5, 2),
                type: 'SHARK_BUY',
              });
            }
            if (value.sheep_buy > (deal_value_5 * sellRate) / 100) {
              data.push({
                ts: value.ts,
                symbol,
                m: round(value.sheep_buy / deal_value_5, 2),
                type: 'SHEEP_BUY',
              });
            }
          });
        },
      );
      setDataSource(data);
    }
  }, [props.state.chartData, sellRate, symbolSearch, buyRate]);

  return (
    <>
      <div className="mt-5 grid grid-cols-1 text-xs">
        <div className="grid grid-cols-1 text-xs">
          <h2>ALL</h2>
          <Table
            pagination={false}
            virtual={true}
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1700, y: 400 }}
            rowKey={(record) =>
              `${record['symbol']}_${record['ts']}_${record['type']}`
            }
            summary={() => (
              <Table.Summary fixed="top">
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={1} align="center">
                    <Search
                      // style={{ width: 100 }}
                      className="uppercase"
                      placeholder="Symbol"
                      onChange={(e) => {
                        setSymbolSearch(e?.target?.value);
                      }}
                      onSearch={() => {}}
                    />
                  </Table.Summary.Cell>
                  {/*<Table.Summary.Cell index={2} colSpan={2} align="center">*/}
                  {/*  <div className="inline">*/}
                  {/*    <span className="mr-2">GTGD</span>*/}
                  {/*    <InputNumber*/}
                  {/*      min={0}*/}
                  {/*      max={1000}*/}
                  {/*      defaultValue={tradeValue}*/}
                  {/*      onChange={onTradeValueChange}*/}
                  {/*    />*/}
                  {/*  </div>*/}
                  {/*</Table.Summary.Cell>*/}
                  {/*<Table.Summary.Cell index={12}>*/}
                  {/*  Fix Right*/}
                  {/*</Table.Summary.Cell>*/}
                </Table.Summary.Row>
              </Table.Summary>
            )}
            // antd site header height
            sticky={{ offsetHeader: 64 }}
          />
        </div>
      </div>
    </>
  );
});
