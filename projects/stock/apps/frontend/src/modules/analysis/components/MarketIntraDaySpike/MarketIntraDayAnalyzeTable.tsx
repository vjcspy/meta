import MarketIntraDayTickAnalysisTable from '@modules/analysis/components/MarketIntraDaySpike/MarketIntraDayTickAnalysisTable';
import withMarketIntraDayChartData from '@modules/analysis/hoc/market-intra-day/withMarketIntraDayChartData';
import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import Row from '@src/components/form/Row';
import { TIMEZONE } from '@src/value/common.value';
import { analyzeTickHistory } from '@stock/packages-com/dist/tick/analyze-tick-history';
import { combineHOC } from '@web/ui-extension/dist';
import Search from 'antd/es/input/Search';
import InputNumber from 'antd/es/input-number';
import Slider from 'antd/es/slider';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { forEach, last } from 'lodash-es';
import momentTimezone from 'moment-timezone';
import React, { useEffect, useMemo, useState } from 'react';

interface DataType {
  symbol: string;
  sharkBuyCount: number;
  sharkSellCount: number;
  sheepBuyCount: number;
  sheepSellCount: number;
  firstSheepSell: number;
  firstSheepBuy: number;
  firstSharkBuy: number;
  firstSharkSell: number;
}

export default combineHOC(withMarketIntraDayChartData)((props) => {
  const [sellRate, setSellRate] = useState(5);
  const [buyRate, setBuyRate] = useState(5);
  const [symbolSearch, setSymbolSearch] = useState<string>();

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
        title: 'shark sell',
        dataIndex: 'firstSharkSell',
        key: 'firstSharkSell',
        sorter: (a, b) => a.firstSharkSell - b.firstSharkSell,
        render: (value) => {
          if (value < Infinity) {
            return momentTimezone.unix(value).tz(TIMEZONE).format('HH:mm');
          }
          return '';
        },
        width: 70,
      },
      {
        title: '# shark sell',
        dataIndex: 'sharkSellCount',
        key: 'sharkSellCount',
        sorter: (a, b) => a.sharkSellCount - b.sharkSellCount,
        width: 70,
      },
      {
        title: 'shark buy',
        dataIndex: 'firstSharkBuy',
        key: 'firstSharkBuy',
        sorter: (a, b) => a.firstSharkBuy - b.firstSharkBuy,
        render: (value) => {
          if (value < Infinity) {
            return momentTimezone.unix(value).tz(TIMEZONE).format('HH:mm');
          }
          return '';
        },
        width: 70,
      },
      {
        title: '# shark buy',
        dataIndex: 'sharkBuyCount',
        key: 'sharkBuyCount',
        sorter: (a, b) => a.sharkBuyCount - b.sharkBuyCount,
        width: 70,
      },
      {
        title: 'sheep buy',
        dataIndex: 'firstSheepBuy',
        key: 'firstSheepBuy',
        sorter: (a, b) => a.firstSheepBuy - b.firstSheepBuy,
        render: (value) => {
          if (value < Infinity) {
            return momentTimezone.unix(value).tz(TIMEZONE).format('HH:mm');
          }
          return '';
        },
        width: 70,
      },
      {
        title: '# sheep buy',
        dataIndex: 'sheepBuyCount',
        key: 'sheepBuyCount',
        sorter: (a, b) => a.sheepBuyCount - b.sheepBuyCount,
        width: 70,
      },
      {
        title: 'sheep sell',
        dataIndex: 'firstSheepSell',
        key: 'firstSheepSell',
        sorter: (a, b) => a.firstSheepSell - b.firstSheepSell,
        render: (value) => {
          if (value < Infinity) {
            return momentTimezone.unix(value).tz(TIMEZONE).format('HH:mm');
          }
          return '';
        },
        width: 70,
      },
      {
        title: '# sheep sell',
        dataIndex: 'sheepSellCount',
        sorter: (a, b) => a.sheepSellCount - b.sheepSellCount,
        key: 'sharkSellCount',
        width: 70,
      },
    ];

    return col;
  }, []);

  useEffect(() => {
    if (props.state.chartData) {
      const alertByTicks: Record<string, any> = {};
      forEach(
        props.state.chartData.currentIntraDayDataByTick,
        (current, symbol) => {
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

          alertByTicks[symbol] = analyzeTickHistory(
            current,
            deal_value_5,
            sellRate,
            buyRate,
          );
        },
      );

      const dt: (DataType & { key: string })[] = [];
      forEach(alertByTicks, (data, symbol) => {
        const { alerts } = data;
        dt.push({
          key: symbol,
          symbol,
          firstSharkBuy: (last(alerts.shark_buy) as any)?.ts ?? Infinity,
          firstSharkSell: (last(alerts.shark_sell) as any)?.ts ?? Infinity,
          firstSheepSell: (last(alerts.sheep_sell) as any)?.ts ?? Infinity,
          firstSheepBuy: (last(alerts.sheep_buy) as any)?.ts ?? Infinity,
          sharkBuyCount: alerts.shark_buy.length,
          sharkSellCount: alerts.shark_sell.length,
          sheepBuyCount: alerts.sheep_buy.length,
          sheepSellCount: alerts.sheep_sell.length,
        });
      });

      setDataSource(dt);
    }
  }, [props.state.chartData, sellRate, symbolSearch, buyRate]);

  return (
    <>
      <Row title={`Market IntraDay Analyze Table`} oneCol={false}>
        <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-4">
          <div className="grid grid-cols-4">
            <div className="col-span-3">
              <label>Sell Rate %</label>
              <Slider
                min={1}
                max={100}
                onChange={(newVal) => setSellRate(newVal)}
                value={sellRate}
              />
            </div>
            <div className="mt-5">
              <InputNumber
                min={1}
                max={100}
                style={{ margin: '0 16px' }}
                value={sellRate}
                onChange={(newVal) =>
                  setSellRate(typeof newVal === 'number' ? newVal : 0)
                }
              />
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div className="col-span-3">
              <label>Buy Rate %</label>
              <Slider
                min={1}
                max={5}
                onChange={(newVal) => setBuyRate(newVal)}
                value={buyRate}
              />
            </div>
            <div className="mt-5">
              <InputNumber
                min={1}
                max={5}
                style={{ margin: '0 16px' }}
                value={buyRate}
                onChange={(newVal) =>
                  setBuyRate(typeof newVal === 'number' ? newVal : 0)
                }
              />
            </div>
          </div>
        </div>
        {dataSource && (
          <div className="mt-5 grid grid-cols-1 text-xs">
            <div className="grid grid-cols-1 text-xs">
              <h2>GROUPED</h2>
              <Table
                pagination={false}
                columns={columns}
                dataSource={dataSource}
                scroll={{ x: 1700, y: 400 }}
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
        )}
        <MarketIntraDayTickAnalysisTable
          buyRate={buyRate}
          sellRate={sellRate}
        />
      </Row>
    </>
  );
});
