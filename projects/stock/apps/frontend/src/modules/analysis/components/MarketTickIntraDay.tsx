import withMarketTickDate from '@modules/analysis/hoc/withMarketTickDate';
import withMarketTickResolveChartStatus from '@modules/analysis/hoc/withMarketTickResolveChartStatus';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension/dist';
import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';

export default combineHOC(
  withMarketTickDate,
  withMarketTickResolveChartStatus,
)((props) => {
  const [date, setDate] = useState(props?.state?.marketToDate);

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
        <div className="grid grid-cols-1 text-xs"></div>
      </Row>
    </>
  );
});
