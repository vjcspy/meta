import { combineHOC } from '@web/ui-extension';
import sortBy from 'lodash/sortBy';
import type { DataTableSortStatus } from 'mantine-datatable';
import { DataTable } from 'mantine-datatable';
import { useCallback, useEffect, useMemo, useState } from 'react';

import Dropdown from '@/components/Dropdown';
import { withAnalysisData } from '@/hoc/analysis/withAnalysisData';

const cols = [
    { accessor: 'symbol', title: 'Symbol' },
    { accessor: 'trade_value_7', title: 'GTGD7' },
    { accessor: 'trade_value_14', title: 'GTGD14' },
    { accessor: 'trade_value_30', title: 'GTGD30' },
    { accessor: 'cap', title: 'Cap' },
    { accessor: 'l16_hullma_trend', title: 'Trend' },
    { accessor: 'l16_hullma_day_in_trend', title: 'Day in trend' },
    { accessor: 'l16_hullma_highest_diff_percent', title: '% change' },
    { accessor: 'cur_gap_percent', title: '% gap' },
];

const trendState = [
    { accessor: 'up', title: 'Up' },
    { accessor: 'down', title: 'Down' },
];

const AnalysisTable = combineHOC(withAnalysisData)((props) => {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(
        sortBy(props.state.analysis, 'cap'),
    );
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'cap',
        direction: 'asc',
    });

    const [hideCols, setHideCols] = useState<any>([
        'trade_value_7',
        'trade_value_30',
    ]);
    const [trendFilter, setTrendFilter] = useState(['down']);

    const toggleTrendFilter = useCallback(
        (trend: string) => {
            if (trendFilter.includes(trend)) {
                setTrendFilter(trendFilter.filter((d: any) => d !== trend));
            } else {
                setTrendFilter([...trendFilter, trend]);
            }
        },
        [trendFilter],
    );

    const dtColumns = useMemo(() => {
        return cols.map((c) => {
            return {
                accessor: c.accessor,
                title: c.title,
                sortable: true,
                hidden: hideCols.includes(c.accessor),
            };
        });
    }, [hideCols]);
    const toggleHideColumn = useCallback(
        (col: any, _value: any) => {
            if (hideCols.includes(col)) {
                setHideCols(hideCols.filter((d: any) => d !== col));
            } else {
                setHideCols([...hideCols, col]);
            }
        },
        [hideCols],
    );

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return props.state.analysis.filter((item) => {
                if (
                    !trendFilter.includes('up') &&
                    item.l16_hullma_trend === 1
                ) {
                    return false;
                } else if (
                    !trendFilter.includes('down') &&
                    item.l16_hullma_trend === -1
                ) {
                    return false;
                }

                return item.symbol.toString().includes(search);
            });
        });
    }, [search, trendFilter, props.state.analysis]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(
            sortStatus.direction === 'desc' ? data.reverse() : data,
        );
        setPage(1);
    }, [sortStatus]);

    return (
        <>
            {props.state.analysis.length > 0 && (
                <div>
                    <div className="panel">
                        <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                Analysis Table
                            </h5>
                            <div className="flex items-center gap-5 ltr:ml-auto rtl:mr-auto">
                                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement="bottom-start"
                                            btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                            button={
                                                <>
                                                    <span className="ltr:mr-1 rtl:ml-1">
                                                        Columns
                                                    </span>
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M19 9L12 15L5 9"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </>
                                            }
                                        >
                                            <ul className="!min-w-[140px]">
                                                {cols.map((col, i) => {
                                                    return (
                                                        <li
                                                            key={i}
                                                            className="flex flex-col"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <div className="flex items-center px-4 py-1">
                                                                <label className="mb-0 cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={
                                                                            !hideCols.includes(
                                                                                col.accessor,
                                                                            )
                                                                        }
                                                                        className="form-checkbox"
                                                                        defaultValue={
                                                                            col.accessor
                                                                        }
                                                                        onChange={(
                                                                            event: any,
                                                                        ) => {
                                                                            toggleHideColumn(
                                                                                col.accessor,
                                                                                event
                                                                                    .target
                                                                                    .checked,
                                                                            );
                                                                        }}
                                                                    />
                                                                    <span className="ltr:ml-2 rtl:mr-2">
                                                                        {
                                                                            col.title
                                                                        }
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5 md:flex-row md:items-center">
                                    <div className="dropdown">
                                        <Dropdown
                                            placement="bottom-start"
                                            btnClassName="!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark"
                                            button={
                                                <>
                                                    <span className="ltr:mr-1 rtl:ml-1">
                                                        Trend State
                                                    </span>
                                                    <svg
                                                        className="h-5 w-5"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                            d="M19 9L12 15L5 9"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </>
                                            }
                                        >
                                            <ul className="!min-w-[140px]">
                                                {trendState.map((col, i) => {
                                                    return (
                                                        <li
                                                            key={i}
                                                            className="flex flex-col"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <div className="flex items-center px-4 py-1">
                                                                <label className="mb-0 cursor-pointer">
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={trendFilter.includes(
                                                                            col.accessor,
                                                                        )}
                                                                        className="form-checkbox"
                                                                        defaultValue={
                                                                            col.accessor
                                                                        }
                                                                        onChange={() => {
                                                                            toggleTrendFilter(
                                                                                col.accessor,
                                                                            );
                                                                        }}
                                                                    />
                                                                    <span className="ltr:ml-2 rtl:mr-2">
                                                                        {
                                                                            col.title
                                                                        }
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <input
                                        type="text"
                                        className="form-input"
                                        placeholder="Search Symbol..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="datatables">
                            <DataTable
                                className="table-hover whitespace-nowrap"
                                idAccessor="symbol"
                                records={recordsData}
                                columns={dtColumns}
                                highlightOnHover
                                totalRecords={initialRecords.length}
                                recordsPerPage={pageSize}
                                page={page}
                                onPageChange={(p) => setPage(p)}
                                recordsPerPageOptions={PAGE_SIZES}
                                onRecordsPerPageChange={setPageSize}
                                sortStatus={sortStatus}
                                onSortStatusChange={setSortStatus}
                                minHeight={200}
                                paginationText={({ from, to, totalRecords }) =>
                                    `Showing  ${from} to ${to} of ${totalRecords} entries`
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
});

export default AnalysisTable;
