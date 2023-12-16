import withMarketTickCat from '@modules/analysis/hoc/withMarketTickCat';
import withMarketTickDate from '@modules/analysis/hoc/withMarketTickDate';
import withMarketTickResolveChartStatus from '@modules/analysis/hoc/withMarketTickResolveChartStatus';
import type { MarketTickChartDataType } from '@modules/analysis/util/ticks/calTickRangeData';
import { MarketTicks } from '@modules/analysis/util/ticks/market-ticks';
import { withThemState } from '@modules/app/hoc/withThemState';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';
import Search from 'antd/es/input/Search';
import Table, { type ColumnsType } from 'antd/es/table';
import { filter, find, forEach } from 'lodash-es';
import moment from 'moment/moment';
import React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Flatpickr from 'react-flatpickr';

const TableComponent = React.memo(
  (props: {
    isDarkMode: boolean;
    columns: any;
    dataSource: any;
    setSymbolSearch: any;
  }) => {
    return (
      <div className="mt-5 grid grid-cols-1 text-xs">
        <div className="grid grid-cols-1 text-xs">
          <Table
            pagination={false}
            // virtual
            columns={props.columns}
            dataSource={props.dataSource}
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
                        props.setSymbolSearch(e?.target?.value);
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
    );
  },
);

export default combineHOC(
  withThemState,
  withMarketTickDate,
  withMarketTickResolveChartStatus,
  withMarketTickCat,
)((props) => {
  const [date, setDate] = useState<string>(props?.state?.marketToDate);
  const [symbolSearch, setSymbolSearch] = useState('');

  useEffect(() => {
    if (props?.state?.marketToDate) {
      setDate(props?.state?.marketToDate);
    }
  }, [props?.state?.marketToDate]);

  const onToDateChange = useCallback((dates: any) => {
    if (Array.isArray(dates) && dates.length == 1) {
      setDate(moment(dates[0]).format('YYYY-MM-DD'));
    }
  }, []);

  const columns = useMemo(() => {
    const c: ColumnsType<MarketTickChartDataType> = [
      {
        title: 'Symbol',
        width: 120,
        dataIndex: 'symbol',
        fixed: 'left',
      },
      {
        title: 'sheep Buy',
        dataIndex: 'bSheep',
        width: 70,
        sorter: (a, b) => a.bSheep - b.bSheep,
      },
      {
        title: 'sheep Sell',
        dataIndex: 'sSheep',
        width: 70,
        sorter: (a, b) => a.sSheep - b.sSheep,
      },
      {
        title: 'shark Buy',
        dataIndex: 'bShark',
        width: 70,
        sorter: (a, b) => a.bShark - b.bShark,
      },
      {
        title: 'shark Sell',
        dataIndex: 'sShark',
        width: 70,
        sorter: (a, b) => a.sShark - b.sShark,
      },
      {
        title: 'diff sheep',
        dataIndex: 'diff_sheep',
        width: 70,
        sorter: (a, b) => a.diff_sheep - b.diff_sheep,
      },
      {
        title: 'diff shark',
        dataIndex: 'diff_shark',
        width: 70,
        sorter: (a, b) => a.diff_shark - b.diff_shark,
      },
      /*Sum*/
      {
        title: 'Σ sheep Buy',
        dataIndex: 'sBSheep',
        width: 80,
        sorter: (a, b) => a.sBSheep - b.sBSheep,
      },
      {
        title: 'Σ sheep Sell',
        dataIndex: 'sSSheep',
        width: 80,
        sorter: (a, b) => a.sSSheep - b.sSSheep,
      },
      {
        title: 'Σ shark Buy',
        dataIndex: 'sBShark',
        width: 80,
        sorter: (a, b) => a.sBShark - b.sBShark,
      },
      {
        title: 'Σ shark Sell',
        dataIndex: 'sSShark',
        width: 80,
        sorter: (a, b) => a.sSShark - b.sSShark,
      },

      /*Percent*/
      {
        title: '% sheep buy/sell',
        dataIndex: 'pct_buy_sell_sheep',
        width: 70,
        sorter: (a, b) => a.pct_buy_sell_sheep - b.pct_buy_sell_sheep,
      },
      {
        title: '% shark buy/sell',
        dataIndex: 'pct_buy_sell_shark',
        width: 70,
        sorter: (a, b) => a.pct_buy_sell_shark - b.pct_buy_sell_shark,
      },
      {
        title: '% buy sheep shark',
        dataIndex: 'pct_buy_sheep_shark',
        width: 70,
        sorter: (a, b) => a.pct_buy_sheep_shark - b.pct_buy_sheep_shark,
      },
      {
        title: '% sell sheep shark',
        dataIndex: 'pct_sell_sheep_shark',
        width: 70,
        sorter: (a, b) => a.pct_sell_sheep_shark - b.pct_sell_sheep_shark,
      },
      {
        title: '%Σ buy sheep shark',
        dataIndex: 'pct_sum_buy_sheep_shark',
        width: 70,
        sorter: (a, b) => a.pct_sum_buy_sheep_shark - b.pct_sum_buy_sheep_shark,
      },
      {
        title: '%Σ sell sheep shark',
        dataIndex: 'pct_sum_sell_sheep_shark',
        width: 70,
        sorter: (a, b) =>
          a.pct_sum_sell_sheep_shark - b.pct_sum_sell_sheep_shark,
      },
      {
        title: '%Σ buy sell sheep',
        dataIndex: 'pct_sum_buy_sell_sheep',
        width: 70,
        sorter: (a, b) => a.pct_sum_buy_sell_sheep - b.pct_sum_buy_sell_sheep,
      },
      {
        title: '%Σ buy sell shark',
        dataIndex: 'pct_sum_buy_sell_shark',
        width: 70,
        sorter: (a, b) => a.pct_sum_buy_sell_shark - b.pct_sum_buy_sell_shark,
      },
    ];

    return c;
  }, []);
  const [dataSource, setDataSource] = useState<any>();

  useEffect(() => {
    if (props?.state?.resolveMarketTickChartStatus?.isFinish && date) {
      let data: any = [];
      let error: Error;

      forEach(
        filter(
          MarketTicks.tickCharts,
          (t) => props.state.selectedMarketCat?.symbols?.indexOf(t.symbol) > -1,
        ),
        (d) => {
          const dateData = find(d.data, (_d) =>
            moment(_d.date).isSame(moment(date), 'day'),
          );

          if (!dateData) {
            error = new Error(`Not found date ${date} for symbol ${d.symbol}`);
            return false;
          }

          data.push({
            key: d.symbol,
            symbol: d.symbol,
            ...dateData,
          });
        },
      );

      // @ts-ignore
      if (error) {
        console.error(error);

        return;
      }

      if (symbolSearch) {
        data = filter(
          data,
          (d) => d.symbol.indexOf(symbolSearch.toUpperCase()) > -1,
        );
      }

      setDataSource(data);
    }
  }, [
    symbolSearch,
    date,
    props.state.resolveMarketTickChartStatus?.isFinish,
    props.state.selectedMarketCat?.symbols,
  ]);

  return (
    <>
      <Row title={`Market Tick Category Intra-day`} oneCol={false}>
        <div className="custom-select grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label>Specific Date</label>
            <Flatpickr
              value={date}
              options={{
                dateFormat: 'Y-m-d',
                position: 'auto left',
              }}
              className="form-input"
              onChange={onToDateChange}
            />
          </div>
        </div>
        {dataSource && (
          <TableComponent
            isDarkMode={props.state.themeState.isDarkMode}
            columns={columns}
            dataSource={dataSource}
            setSymbolSearch={setSymbolSearch}
          />
        )}
      </Row>
    </>
  );
});
