import { combineHOC } from '@web/ui-extension';
import moment from 'moment';
import { useCallback } from 'react';

import DatePicker from '@/components/analysis/DatePicker';
import { withFromToDate } from '@/hoc/analysis/withFromToDate';

const ToDate = combineHOC(withFromToDate)((props) => {
    const onChange = useCallback(
        (dates: any) => {
            // props.actions.setFromDate
            if (Array.isArray(dates) && dates.length == 1) {
                props.actions.setToDate(moment(dates[0]).format('YYYY-MM-DD'));
            }
        },
        [props.actions.setFromDate],
    );

    return (
        <>
            <DatePicker
                preTitle="To Date:"
                value={props.state.toDate}
                onChange={onChange}
            />
        </>
    );
});

export default ToDate;
