import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';

export const withFromToDate = createUiHOC(() => {
    const dispatch = useAppDispatch();
    const fromDate = useSelector(
        (state: IRootState) => state.analysis.fromDate,
    );
    const toDate = useSelector((state: IRootState) => state.analysis.toDate);
    const setFromDate = useCallback((fromDate: string) => {
        dispatch(
            analysisActions.setFromDate({
                fromDate,
            }),
        );
    }, []);

    const setToDate = useCallback((toDate: string) => {
        dispatch(
            analysisActions.setToDate({
                toDate,
            }),
        );
    }, []);

    return {
        state: { fromDate, toDate },
        actions: { setFromDate, setToDate },
    };
}, 'withFromDate');
