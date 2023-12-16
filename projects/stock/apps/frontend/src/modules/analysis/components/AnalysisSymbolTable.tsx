'use client';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { withAnalysisTableData } from '@modules/analysis/hoc/withAnalysisTableData';
import { withCors } from '@modules/analysis/hoc/withCors';
import withMarketSymbolCategories from '@modules/analysis/hoc/withMarketSymbolCategories';
import { withThemState } from '@modules/app/hoc/withThemState';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension';
import { InputNumber, Switch } from 'antd';
import Search from 'antd/es/input/Search';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { compact, filter, find, map, uniq, uniqBy } from 'lodash-es';
import { useCallback, useMemo, useState } from 'react';

interface AnalysisSymbolType {
  key: React.Key;
  symbol: string;
  industryName1: string;
  industryName2: string;
  industryName3: string;
  totalShares: number;

  /*Analysis table*/
  trade_value_7: number;
  trade_value_14: number;
  trade_value_30: number;
  l16_hullma_trend: number;
  l16_hullma_day_in_trend: number;
  l16_hullma_highest_diff_percent: number;
  cur_gap_percent: number;
  cap: number;
}

const hullTrend = {
  1: 'UP',
  0: '-',
  [-1]: 'DOWN',
};

export default combineHOC(
  withThemState,
  withCors,
  withAnalysisTableData,
  withMarketSymbolCategories,
)((props) => {
  const [tradeValue, setTradeValue] = useState(80); // filter GTGD
  const { adjustMarketCat } = props; // Allow select symbol to market category
  const [symbolSearch, setSymbolSearch] = useState('');

  const originData = useMemo(() => {
    if (
      !Array.isArray(props.state.cors) ||
      props.state.cors.length === 0 ||
      !Array.isArray(props.state.analysisTableData) ||
      props.state.analysisTableData.length === 0
    ) {
      return undefined;
    }

    let data = map(props.state.analysisTableData, (i: any) => {
      if (
        Math.max(i.trade_value_7, i.trade_value_14, i.trade_value_30) <
        tradeValue
      ) {
        return undefined;
      }
      const cor = find(props.state.cors, (c: any) => c?.code === i?.symbol);

      if (!cor) {
        return undefined;
      }

      return { key: i.symbol, ...i, ...cor };
    });
    data = compact(data);
    data = uniqBy(data, 'symbol');
    return data;
  }, [props.state.analysisTableData, props.state.cors, tradeValue]);

  const columns = useMemo(() => {
    if (
      adjustMarketCat &&
      !Array.isArray(props?.state?.selectedMarketCat?.symbols)
    ) {
      return undefined;
    }

    const tableColumns: ColumnsType<AnalysisSymbolType> = [
      {
        title: 'Symbol',
        width: 100,
        dataIndex: 'symbol',
        fixed: 'left',
      },
      {
        title: '',
        width: adjustMarketCat ? 70 : 10,
        dataIndex: 'code',
        fixed: 'left' as any,
        render: (value) => {
          return (
            adjustMarketCat && (
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                checked={
                  props.state.selectedMarketCat.symbols.indexOf(value) > -1
                }
                onChange={(e) => {
                  let symbols = [...props.state.selectedMarketCat.symbols];
                  if (e) {
                    symbols.push(value);
                    symbols = uniq(symbols);
                  } else {
                    symbols = filter(symbols, (a) => a !== value);
                  }
                  props.actions.saveMarketCat({
                    ...props.state.selectedMarketCat,
                    symbols,
                  });
                }}
              />
            )
          );
        },
        filters: adjustMarketCat
          ? [
              {
                text: 'On',
                value: 1,
              },
              {
                text: 'Off',
                value: -1,
              },
            ]
          : undefined,
        onFilter: (value: any, record) => {
          if (value == 1) {
            return (
              props.state.selectedMarketCat.symbols.indexOf(record.symbol) > -1
            );
          } else if (value === -1) {
            return (
              props.state.selectedMarketCat.symbols.indexOf(record.symbol) == -1
            );
          }

          return true;
        },
        sorter: (_, b) =>
          props.state.selectedMarketCat.symbols.indexOf(b.symbol),
      },
      {
        title: 'trend',
        dataIndex: 'l16_hullma_trend',
        sorter: (a, b) => a.l16_hullma_trend - b.l16_hullma_trend,
        fixed: 'left',
        render: (value: any) => {
          // @ts-ignore
          return <span>{hullTrend[value]}</span>;
        },
        filters: [
          {
            text: 'Up',
            value: 1,
          },
          {
            text: 'Down',
            value: -1,
          },
          {
            text: 'Unknown',
            value: 0,
          },
        ],
        onFilter: (value: any, record) => record.l16_hullma_trend === value,
        width: 100,
      },
      {
        title: 'day in Trend',
        dataIndex: 'l16_hullma_day_in_trend',
        sorter: (a, b) => a.l16_hullma_day_in_trend - b.l16_hullma_day_in_trend,
        fixed: 'left',
        width: 70,
      },
      {
        title: 'hull diff',
        dataIndex: 'l16_hullma_highest_diff_percent',
        sorter: (a, b) =>
          a.l16_hullma_highest_diff_percent - b.l16_hullma_highest_diff_percent,
        fixed: 'left',
        width: 70,
      },

      {
        title: 'GTGD3',
        dataIndex: 'trade_value_7',
        sorter: (a, b) => a.trade_value_7 - b.trade_value_7,
        fixed: 'left',
        width: 80,
      },
      {
        title: 'GTGD14',
        dataIndex: 'trade_value_14',
        sorter: (a, b) => a.trade_value_14 - b.trade_value_14,
        fixed: 'left',
        width: 80,
      },
      {
        title: 'GTGD30',
        dataIndex: 'trade_value_30',
        sorter: (a, b) => a.trade_value_30 - b.trade_value_30,
        fixed: 'left',
        width: 80,
      },
      {
        title: 'gap',
        dataIndex: 'cur_gap_percent',
        sorter: (a, b) => a.cur_gap_percent - b.cur_gap_percent,
        fixed: 'left',
        width: 70,
      },
      {
        title: 'cap',
        dataIndex: 'cap',
        sorter: (a, b) => a.cap - b.cap,
        fixed: 'left',
        width: 80,
      },
      {
        title: 'industryName1',
        dataIndex: 'industryName1',
        width: 130,
      },
      {
        title: 'industryName2',
        dataIndex: 'industryName2',
        width: 170,
      },
      {
        title: 'industryName3',
        dataIndex: 'industryName3',
        width: 170,
      },
    ];
    return tableColumns;
  }, [adjustMarketCat, props.state?.selectedMarketCat]);

  const dataSource = useMemo(() => {
    if (!originData) {
      return undefined;
    }
    let dataSource = originData;
    if (symbolSearch) {
      dataSource = filter(dataSource, (i) => {
        return (
          typeof i?.symbol === 'string' &&
          i.symbol.indexOf(symbolSearch.toUpperCase()) > -1
        );
      });
    }

    return dataSource;
  }, [originData, symbolSearch]);

  const onTradeValueChange = useCallback((e: any) => {
    setTradeValue(e);
  }, []);

  return (
    <>
      <Row
        title={`Analysis Symbol Table ${
          props.adjustMarketCat
            ? `-> Category: ${props.state?.selectedMarketCat?.name}(${props?.state?.selectedMarketCat?.symbols?.length} symbols)`
            : ''
        }`}
        oneCol={false}
      >
        {(!dataSource || !columns) && (
          <div>
            <span>Loading ...</span>
          </div>
        )}
        {dataSource && columns && (
          <div className="grid grid-cols-1 text-xs">
            <Table
              pagination={false}
              virtual
              columns={columns}
              dataSource={dataSource}
              scroll={{ x: 1700, y: 400 }}
              summary={() => (
                <Table.Summary fixed="top">
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2} align="center">
                      <Search
                        style={{ width: 100 }}
                        className="uppercase"
                        placeholder="Symbol"
                        onChange={(e) => {
                          setSymbolSearch(e?.target?.value);
                        }}
                        onSearch={() => {}}
                      />
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} colSpan={2} align="center">
                      <div className="inline">
                        <span className="mr-2">GTGD</span>
                        <InputNumber
                          min={0}
                          max={1000}
                          defaultValue={tradeValue}
                          onChange={onTradeValueChange}
                        />
                      </div>
                    </Table.Summary.Cell>
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
        )}
      </Row>
    </>
  );
});
