import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';

export const withFilterTradeValue = createUiHOC(() => {
    const filterTradeValue = useSelector(
        (state: IRootState) => state.analysis.filterTradeValue,
    );
    const dispatch = useAppDispatch();
    const setFilterTradeValue = useCallback((filterTradeValue: number) => {
        dispatch(analysisActions.setFilterTradeValue({ filterTradeValue }));
    }, []);

    return {
        state: {
            filterTradeValue,
        },
        actions: { setFilterTradeValue },
    };
}, 'withFilterTradeValue');
