import TicksSupplyDemandSumDayChart from '@modules/analysis/components/TickRange/TicksSupplyDemandSumDayChart';
import withMarketTickCat from '@modules/analysis/hoc/withMarketTickCat';
import withMarketTickDate from '@modules/analysis/hoc/withMarketTickDate';
import withMarketTickResolveChartStatus from '@modules/analysis/hoc/withMarketTickResolveChartStatus';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { MarketTicks } from '@modules/analysis/util/ticks/market-ticks';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';
import { filter } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';

import TicksSupplyDemandDayChart from '../TickRange/TicksSupplyDemandDayChart';

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
  withMarketTickResolveChartStatus,
)((props) => {
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

  const hasSymbolInCurrentCat = useMemo(() => {
    return props?.state?.selectedMarketCat?.symbols.length > 0;
  }, [props?.state?.selectedMarketCat?.symbols]);

  const [tickRageData, setTickRageData] = useState<any>();

  useEffect(() => {
    if (props.state?.resolveMarketTickChartStatus?.isFinish) {
      setTickRageData(
        filter(
          MarketTicks.tickCharts,
          (i) =>
            props?.state?.selectedMarketCat?.symbols?.indexOf(i.symbol) > -1,
        ),
      );
    }
  }, [
    props.state?.resolveMarketTickChartStatus?.isFinish,
    props?.state?.selectedMarketCat?.symbols,
  ]);

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

            {viewChart.sheep && (
              <TicksSupplyDemandDayChart
                tickRageData={tickRageData}
                type="sheep"
                market={true}
              />
            )}
            {viewChart.shark && (
              <TicksSupplyDemandDayChart
                tickRageData={tickRageData}
                type="shark"
                market={true}
              />
            )}
          </>
        )}
      </Row>
    </>
  );
});
