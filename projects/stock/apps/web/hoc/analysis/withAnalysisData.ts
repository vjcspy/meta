import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';

export const withAnalysisData = createUiHOC(() => {
    const dispatch = useAppDispatch();
    const analysis = useSelector(
        (state: IRootState) => state.analysis.analysis,
    );

    useEffect(() => {
        if (analysis.length === 0) {
            dispatch(analysisActions.getAnalysis());
        }
    }, [analysis]);

    return {
        state: {
            analysis,
        },
    };
}, 'withAnalysisData');
