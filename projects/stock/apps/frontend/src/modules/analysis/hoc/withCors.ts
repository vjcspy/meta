import { ANALYSIS_ACTIONS } from '@src/modules/analysis/store/analysis.actions';
import type { IRootState } from '@src/store';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { useSelector } from '@stock/packages-redux';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withCors = createUiHOC(() => {
  const cors = useSelector((state: IRootState) => state.analysis.cors);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!Array.isArray(cors) || cors.length === 0) {
      dispatch(ANALYSIS_ACTIONS.loadCors());
    }
  }, [cors]);

  return {
    state: { cors },
  };
}, 'withCors');
