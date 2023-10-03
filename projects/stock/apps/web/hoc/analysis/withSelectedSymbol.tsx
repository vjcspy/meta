import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';
import { SYMBOL_CACHE_KEY } from '@/value/analysis.value';

export const withSelectedSymbol = createUiHOC(() => {
    const symbol = useSelector((state: IRootState) => state.analysis.symbol);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!symbol) {
            const _symbol = localStorage.getItem(SYMBOL_CACHE_KEY);
            if (_symbol) {
                dispatch(
                    analysisActions.setSymbol({
                        symbol: _symbol,
                    }),
                );
            }
        }
    }, [symbol]);

    return {
        state: {
            symbol,
        },
    };
}, 'withSelectedCor');
