import { combineHOC } from '@web/ui-extension';
import { memo } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
// You can import any component you want as a named export from 'react-virtualized', eg
import { areEqual, FixedSizeList as List } from 'react-window';

import { withSymbolPrice } from '@/hoc/analysis/withSymbolPrice';

const SymbolPrices = combineHOC(withSymbolPrice)((props) => {
    const RowItem = memo(({ data, index, style }: any) => {
        // Data passed to List as "itemData" is available as props.data
        const item = data[index];

        return (
            <div style={style}>
                <div className="grid grid-cols-5 gap-4 p-2">
                    <div>{item['date']}</div>
                    <div>{item['high']}</div>
                    <div>{item['low']}</div>
                    <div>{item['close']}</div>
                    <div>{item['open']}</div>
                </div>
            </div>
        );
    }, areEqual);

    return (
        <>
            <div className="space-y-8 pt-5">
                <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-1">
                    <div className="panel">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">
                                {props?.title}
                            </h5>
                            <button
                                type="button"
                                className="font-semibold hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-600"
                            >
                                <span className="flex items-center">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ltr:mr-2 rtl:ml-2"
                                    >
                                        <path
                                            d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            opacity="0.5"
                                            d="M13.9868 5L10.0132 19.8297"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </span>
                            </button>
                        </div>
                        {
                            <div style={{ height: 300 }}>
                                <AutoSizer>
                                    {({ height, width }) => (
                                        <div>
                                            <div
                                                style={{ width }}
                                                className="grid grid-cols-5 gap-4 p-2 font-bold"
                                            >
                                                <div>Date</div>
                                                <div>High</div>
                                                <div>Low</div>
                                                <div>Close</div>
                                                <div>Open</div>
                                            </div>
                                            <List
                                                height={height - 35}
                                                itemCount={
                                                    props?.state?.prices
                                                        ?.length || 0
                                                }
                                                itemData={props?.state?.prices}
                                                itemSize={35}
                                                width={width}
                                            >
                                                {RowItem}
                                            </List>
                                        </div>
                                    )}
                                </AutoSizer>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
});

export default SymbolPrices;
