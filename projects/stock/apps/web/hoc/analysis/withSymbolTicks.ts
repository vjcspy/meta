import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';

export const withSymbolTicks = createUiHOC(() => {
    const symbol = useSelector((state: IRootState) => state.analysis.symbol);
    const fromDate = useSelector(
        (state: IRootState) => state.analysis.fromDate,
    );
    const toDate = useSelector((state: IRootState) => state.analysis.toDate);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (symbol) {
            dispatch(analysisActions.getSymbolTicks());
        }
    }, [symbol, fromDate, toDate]);

    const ticks = useSelector((state: IRootState) => state.analysis.ticks);

    return {
        state: { ticks },
        actions: {},
    };
}, 'withSymbolTicks');
