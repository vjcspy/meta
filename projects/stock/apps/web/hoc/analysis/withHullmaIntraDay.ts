import { createUiHOC } from '@web/ui-extension';
import moment from 'moment/moment';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';

export const withHullmaIntraDay = createUiHOC(() => {
    const hullmaIntraDay = useSelector(
        (state: IRootState) => state.analysis.hullma_intra_day,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!hullmaIntraDay?.fromDate || !hullmaIntraDay?.toDate) {
            dispatch(
                analysisActions.setHullmaDate({
                    fromDate: moment()
                        .utc()
                        .subtract(2, 'days')
                        .format('YYYY-MM-DD'),
                    toDate: moment().utc().format('YYYY-MM-DD'),
                }),
            );
        }
    }, [hullmaIntraDay]);

    return {
        state: {
            hullmaIntraDay,
        },
    };
}, 'withHullmaIntraDay');
