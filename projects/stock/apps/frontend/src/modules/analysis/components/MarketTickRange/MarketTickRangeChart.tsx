import withMarketTickCat from '@modules/analysis/hoc/withMarketTickCat';
import withMarketTickDate from '@modules/analysis/hoc/withMarketTickDate';
import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { MarketTicks } from '@modules/analysis/util/ticks/market-ticks';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';
import { useEffect, useMemo, useState } from 'react';

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

  return (
    <>
      <Row title={`Market Ticks Chart`} oneCol={false}>
        {!hasSymbolInCurrentCat &&
          "Current market category don't have any symbol"}
        {hasSymbolInCurrentCat && (
          <>
            {!calStatus?.isFinish && calStatus?.message}
            {!!calStatus?.isFinish && <></>}
          </>
        )}
      </Row>
    </>
  );
});
