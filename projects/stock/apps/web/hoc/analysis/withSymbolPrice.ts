import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';

export const withSymbolPrice = createUiHOC(() => {
    const symbol = useSelector((state: IRootState) => state.analysis.symbol);
    const fromDate = useSelector(
        (state: IRootState) => state.analysis.fromDate,
    );
    const toDate = useSelector((state: IRootState) => state.analysis.toDate);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (symbol) {
            dispatch(analysisActions.getSymbolPrices());
        }
    }, [symbol, fromDate, toDate]);

    const prices = useSelector((state: IRootState) => state.analysis.prices);

    return {
        state: { prices },
        actions: {},
    };
}, 'withSymbolPrice');
