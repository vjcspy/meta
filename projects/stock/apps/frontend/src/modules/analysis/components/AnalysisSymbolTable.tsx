'use client';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { withAnalysisTableData } from '@modules/analysis/hoc/withAnalysisTableData';
import { withCors } from '@modules/analysis/hoc/withCors';
import { withThemState } from '@modules/app/hoc/withThemState';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';
import { ConfigProvider, Switch, theme } from 'antd';
import Search from 'antd/es/input/Search';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import { compact, find, map, uniqBy } from 'lodash';
import { useMemo, useState } from 'react';

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

const AnalysisSymbolTable = combineHOC(
  withThemState,
  withCors,
  withAnalysisTableData,
)((props) => {
  const [symbolSearch, setSymbolSearch] = useState('');

  const tableData = useMemo(() => {
    if (
      !Array.isArray(props.state.cors) ||
      props.state.cors.length === 0 ||
      !Array.isArray(props.state.analysisTableData) ||
      props.state.analysisTableData.length === 0
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
        width: 100,
        dataIndex: 'code',
        fixed: 'left',
        render: () => {
          return (
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
          );
        },
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
        title: 'dayInTrend',
        dataIndex: 'l16_hullma_day_in_trend',
        sorter: (a, b) => a.l16_hullma_day_in_trend - b.l16_hullma_day_in_trend,
        fixed: 'left',
        width: 100,
      },
      {
        title: 'hullDiff',
        dataIndex: 'l16_hullma_highest_diff_percent',
        sorter: (a, b) =>
          a.l16_hullma_highest_diff_percent - b.l16_hullma_highest_diff_percent,
        fixed: 'left',
        width: 100,
      },

      {
        title: 'industryName1',
        dataIndex: 'industryName1',
      },
      {
        title: 'industryName2',
        dataIndex: 'industryName2',
      },
      {
        title: 'industryName3',
        dataIndex: 'industryName3',
      },
      {
        title: 'GTGD3',
        dataIndex: 'trade_value_7',
        sorter: (a, b) => a.trade_value_7 - b.trade_value_7,
        width: 100,
      },
      {
        title: 'GTGD14',
        dataIndex: 'trade_value_14',
        sorter: (a, b) => a.trade_value_14 - b.trade_value_14,
        width: 100,
      },
      {
        title: 'GTGD30',
        dataIndex: 'trade_value_30',
        sorter: (a, b) => a.trade_value_30 - b.trade_value_30,
        width: 100,
      },
      {
        title: 'gap',
        dataIndex: 'cur_gap_percent',
        sorter: (a, b) => a.cur_gap_percent - b.cur_gap_percent,
        width: 100,
      },
      {
        title: 'cap',
        dataIndex: 'cap',
        sorter: (a, b) => a.cap - b.cap,
        width: 100,
      },
    ];

    let dataSource = map(props.state.analysisTableData, (i: any) => {
      if (symbolSearch) {
        if (
          typeof i?.symbol !== 'string' ||
          i.symbol.indexOf(symbolSearch.toUpperCase()) === -1
        ) {
          return undefined;
        }
      }

      const cor = find(props.state.cors, (c: any) => c?.code === i?.symbol);

      if (!cor) {
        return undefined;
      }

      return { key: i.symbol, ...i, ...cor };
    });
    dataSource = compact(dataSource);
    dataSource = uniqBy(dataSource, 'symbol');

    return {
      columns: tableColumns,
      dataSource,
    };
  }, [props.state.cors, props.state.analysisTableData, symbolSearch]);

  return (
    <>
      <Row title={`Analysis Symbol Table`} oneCol={false}>
        {!tableData && (
          <div>
            <span>Loading ...</span>
          </div>
        )}
        {tableData && (
          <div className="grid grid-cols-1 text-xs">
            <ConfigProvider
              theme={{
                components: {
                  // Table: {
                  //   colorBgBase: 'transparent',
                  //   colorTextBase: 'white',
                  // },
                },
                algorithm: props.state.themeState.isDarkMode
                  ? theme.darkAlgorithm
                  : theme.defaultAlgorithm,
                token: { fontSize: 13 },
              }}
            >
              <Table
                pagination={false}
                virtual
                columns={tableData!.columns}
                dataSource={tableData!.dataSource}
                scroll={{ x: 2000, y: 400 }}
                summary={() => (
                  <Table.Summary fixed="top">
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0} colSpan={2} align="center">
                        <Search
                          style={{ width: 160 }}
                          className="uppercase"
                          placeholder="Symbol"
                          onChange={(e) => {
                            setSymbolSearch(e?.target?.value);
                          }}
                          onSearch={() => {}}
                        />
                      </Table.Summary.Cell>
                      {/*<Table.Summary.Cell index={2}>*/}
                      {/*  Scroll Context*/}
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
            </ConfigProvider>
          </div>
        )}
      </Row>
    </>
  );
});

export default AnalysisSymbolTable;
