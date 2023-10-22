import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';

export const withAnalysisData = createUiHOC(() => {
    const dispatch = useAppDispatch();
    const analysis = useSelector(
        (state: IRootState) => state.analysis.analysis,
    );

    const capFilter = useSelector(
        (state: IRootState) => state.analysis.capFilter,
    );

    const getAnalysis = useCallback(() => {
        dispatch(analysisActions.getAnalysis());
    }, []);
    const setCapFilter = useCallback((capFilter: number) => {
        dispatch(analysisActions.setCapFilter({ capFilter }));
    }, []);

    return {
        state: {
            analysis,
            capFilter,
        },
        actions: {
            getAnalysis,
            setCapFilter,
        },
    };
}, 'withAnalysisData');
