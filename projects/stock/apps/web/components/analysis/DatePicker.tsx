import 'flatpickr/dist/flatpickr.css';

import moment from 'moment';
import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import Flatpickr from 'react-flatpickr';

import Row from '@/components/form/Row';

const DatePicker = (
    props: PropsWithChildren<{
        preTitle?: string;
        value: string;
        onChange: any;
    }>,
) => {
    const value = useMemo(() => moment(props.value).toDate(), [props.value]);
    return (
        <>
            <Row title={`${props?.preTitle} ${props.value}`}>
                <Flatpickr
                    value={value}
                    options={{
                        dateFormat: 'Y-m-d',
                        position: 'auto left',
                    }}
                    className="form-input"
                    onChange={props.onChange}
                />
            </Row>
        </>
    );
};

export default DatePicker;
