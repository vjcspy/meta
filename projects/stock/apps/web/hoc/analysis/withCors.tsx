import { createUiHOC } from '@web/ui-extension';
import type { ComponentType, FC } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { IRootState } from '@/store';
import { analysisActions } from '@/store/analysis.slice';
export function withCors<T extends ComponentType<any>>(
    ReactComponent: T,
): FC<{ data?: any[] }> {
    // Tạo một WrappedComponent để sử dụng các React Hook
    return (props) => {
        const cors = useSelector((state: IRootState) => state.analysis.cors);
        const dispatch = useAppDispatch();

        useEffect(() => {
            if (!Array.isArray(cors) || cors.length === 0) {
                dispatch(analysisActions.getCors());
            }
        }, [cors]);

        // @ts-ignore
        return <ReactComponent {...props} cors={cors} />;
    };
}

export const withCorsHOC = createUiHOC(() => {
    const cors = useSelector((state: IRootState) => state.analysis.cors);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!Array.isArray(cors) || cors.length === 0) {
            dispatch(analysisActions.getCors());
        }
    }, [cors]);

    return {
        state: { cors },
    };
}, 'withCorsHOC');
