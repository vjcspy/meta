import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { combineHOC } from '@web/ui-extension/dist';
import moment from 'moment/moment';
import { useCallback } from 'react';
import Flatpickr from 'react-flatpickr';

export default combineHOC(withFromToDate)((props) => {
  const onToDateChange = useCallback(
    (dates: any) => {
      if (Array.isArray(dates) && dates.length == 1) {
        props?.actions?.setToDate(moment(dates[0]).format('YYYY-MM-DD'));
      }
    },
    [props?.actions?.setToDate],
  );
  return (
    <div>
      <label>To Date</label>
      <Flatpickr
        value={props.state.toDate}
        options={{
          dateFormat: 'Y-m-d',
          position: 'auto left',
        }}
        className="form-input"
        onChange={onToDateChange}
      />
    </div>
  );
});
