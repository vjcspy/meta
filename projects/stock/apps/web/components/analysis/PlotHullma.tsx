import { combineHOC } from '@web/ui-extension';
import moment from 'moment';
import { useEffect } from 'react';

import CandleStick from '@/components/plot/CandleStick';
import { withFromToDate } from '@/hoc/analysis/withFromToDate';
import { withSymbolPrice } from '@/hoc/analysis/withSymbolPrice';

const PlotHullma = combineHOC(
    withSymbolPrice,
    withFromToDate,
)((props) => {
    useEffect(() => {
        props.actions.setFromDate(
            moment().subtract(3, 'months').utc().format('YYYY-MM-DD'),
        );
    }, [props.actions.setFromDate]);

    return (
        <>
            <CandleStick prices_data={props.state.prices} />
        </>
    );
});

export default PlotHullma;
