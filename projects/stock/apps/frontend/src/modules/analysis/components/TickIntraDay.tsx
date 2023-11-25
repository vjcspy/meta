'use client';

import { withFromToDate } from '@modules/analysis/hoc/withFromToDate';
import { withTickIntraDay } from '@modules/analysis/hoc/withTickIntraDay';
import Row from '@src/components/form/Row';
import { combineHOC } from '@web/ui-extension';
import moment from 'moment/moment';
import { useCallback } from 'react';
import Flatpickr from 'react-flatpickr';

const TickIntraDay = combineHOC(
  withTickIntraDay,
  withFromToDate,
)((props) => {
  const onChange = useCallback(
    (dates: any) => {
      // props.actions.setFromDate
      if (Array.isArray(dates) && dates.length == 1) {
        props.actions.setToDate(moment(dates[0]).format('YYYY-MM-DD'));
      }
    },
    [props.actions.setToDate],
  );
  return (
    <Row title={`Tick intra day`}>
      <Flatpickr
        value={props.state.toDate}
        options={{
          dateFormat: 'Y-m-d',
          position: 'auto left',
        }}
        className="form-input"
        onChange={onChange}
      />
    </Row>
  );
});

export default TickIntraDay;
