import TicksSupplyDemandSumDayChart from '@modules/analysis/components/TickRange/TicksSupplyDemandSumDayChart';
import withMarketTickCat from '@modules/analysis/hoc/withMarketTickCat';
import withMarketTickDate from '@modules/analysis/hoc/withMarketTickDate';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { MarketTicks } from '@modules/analysis/util/ticks/market-ticks';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';
import { filter } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';

const defaultViewChart = {
  sumShark: false,
  sumSheep: false,
  shark: false,
  sheep: false,
};
export default combineHOC(
  withMarketTickDate,
  withTradeValueFilter,
  withMarketTickCat,
)((props) => {
  const [calStatus, setCalStatus] = useState<any>();
  useEffect(() => {
    MarketTicks.setTicksDate(
      props.state?.marketFromDate,
      props?.state?.marketToDate,
    );
  }, [props.state?.marketFromDate, props?.state?.marketToDate]);

  useEffect(() => {
    if (
      Array.isArray(props.state?.tradeValueFilter) &&
      props.state?.tradeValueFilter.length === 3
    ) {
      MarketTicks.setMarketTickTradeValue(props.state?.tradeValueFilter[1]);
    }
  }, [props.state?.tradeValueFilter]);

  useEffect(() => {
    const sub = MarketTicks.getResolvedTickChartObserver().subscribe(() => {
      setCalStatus(
        MarketTicks.getResolveTickChartStatus(
          props.state?.selectedMarketCat?.symbols ?? [],
        ),
      );
    });

    return () => {
      sub.unsubscribe();
    };
  }, [props?.state?.selectedMarketCat]);

  const hasSymbolInCurrentCat = useMemo(() => {
    return props?.state?.selectedMarketCat?.symbols.length > 0;
  }, [props?.state?.selectedMarketCat?.symbols]);

  const tickRageData: any = useMemo(() => {
    if (calStatus?.isFinish) {
      return filter(
        MarketTicks.tickCharts,
        (i) => props?.state?.selectedMarketCat?.symbols?.indexOf(i.symbol) > -1,
      );
    } else {
      return undefined;
    }
  }, [calStatus?.isFinish, props?.state?.selectedMarketCat?.symbols]);

  const [viewChart, setViewChart] = useState({
    sumShark: false,
    sumSheep: true,
    shark: false,
    sheep: false,
  });

  return (
    <>
      <Row title={`Market Ticks Chart`} oneCol={false}>
        {!hasSymbolInCurrentCat &&
          "Current market category don't have any symbol"}
        {hasSymbolInCurrentCat && (
          <>
            {!calStatus?.isFinish && calStatus?.message}
            {!!calStatus?.isFinish && (
              <>
                <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-6 lg:grid-cols-6">
                  <div>
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={viewChart.sumSheep}
                        onChange={() =>
                          setViewChart({
                            ...defaultViewChart,
                            sumSheep: !viewChart.sumSheep,
                          })
                        }
                      />
                      <span className=" text-white-dark">View Sum Sheep</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={viewChart.sumShark}
                        onChange={() =>
                          setViewChart({
                            ...defaultViewChart,
                            sumShark: !viewChart.sumShark,
                          })
                        }
                      />
                      <span className=" text-white-dark">View Sum Shark</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={viewChart.sheep}
                        onChange={() =>
                          setViewChart({
                            ...defaultViewChart,
                            sheep: !viewChart.sheep,
                          })
                        }
                      />
                      <span className=" text-white-dark">View Sheep</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={viewChart.shark}
                        onChange={() =>
                          setViewChart({
                            ...defaultViewChart,
                            shark: !viewChart.shark,
                          })
                        }
                      />
                      <span className=" text-white-dark">View shark</span>
                    </label>
                  </div>
                </div>

                {viewChart.sumShark && (
                  <TicksSupplyDemandSumDayChart
                    tickRageData={tickRageData}
                    type="shark"
                    market={true}
                  />
                )}

                {viewChart.sumSheep && (
                  <TicksSupplyDemandSumDayChart
                    tickRageData={tickRageData}
                    type="sheep"
                    market={true}
                  />
                )}
              </>
            )}
          </>
        )}
      </Row>
    </>
  );
});
