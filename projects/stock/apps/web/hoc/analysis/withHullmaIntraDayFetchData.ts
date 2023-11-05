import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';

export const withHullmaIntraDayFetchData = createUiHOC(() => {
    const hullmaIntraDay = useSelector(
        (state: IRootState) => state.analysis.hullma_intra_day,
    );
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(analysisActions.getHullma5());
        dispatch(analysisActions.getHullma15());
        dispatch(analysisActions.getHullma30());
    }, [hullmaIntraDay?.fromDate, hullmaIntraDay?.toDate]);
    return {};
}, 'withHullmaIntraDayFetchData');
