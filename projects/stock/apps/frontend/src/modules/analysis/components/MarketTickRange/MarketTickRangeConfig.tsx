import TradeValueFilter from '@modules/analysis/components/TradeValueFilter';
import withMarketTickDate from '@modules/analysis/hoc/withMarketTickDate';
import withMarketTickResolveChartStatus from '@modules/analysis/hoc/withMarketTickResolveChartStatus';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';
import moment from 'moment/moment';
import { useCallback } from 'react';
import Flatpickr from 'react-flatpickr';

export default combineHOC(
  withMarketTickDate,
  withMarketTickResolveChartStatus,
)((props) => {
  const onFromDateChange = useCallback((dates: any) => {
    if (Array.isArray(dates) && dates.length == 1) {
      props?.actions?.setMarketFromDate(moment(dates[0]).format('YYYY-MM-DD'));
    }
  }, []);
  const onToDateChange = useCallback((dates: any) => {
    if (Array.isArray(dates) && dates.length == 1) {
      props?.actions?.setMarketToDate(moment(dates[0]).format('YYYY-MM-DD'));
    }
  }, []);
  return (
    <>
      <Row
        title={`${
          props.state?.resolveMarketTickChartStatus?.isFinish === false
            ? ` _____ ${props.state?.resolveMarketTickChartStatus?.message} _____`
            : 'Market Ticks Configuration'
        }`}
        oneCol={false}
      >
        <div className="custom-select grid grid-cols-1 gap-6 pt-2 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <label>From Date</label>
            <Flatpickr
              value={props.state.marketFromDate}
              options={{
                dateFormat: 'Y-m-d',
                position: 'auto left',
              }}
              className="form-input"
              onChange={onFromDateChange}
            />
          </div>
          <div>
            <label>To Date</label>
            <Flatpickr
              value={props.state.marketToDate}
              options={{
                dateFormat: 'Y-m-d',
                position: 'auto left',
              }}
              className="form-input"
              onChange={onToDateChange}
            />
          </div>
          <TradeValueFilter />
        </div>
      </Row>
    </>
  );
});
