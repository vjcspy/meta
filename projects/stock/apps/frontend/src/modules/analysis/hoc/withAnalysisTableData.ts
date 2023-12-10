import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withAnalysisTableData = createUiHOC(() => {
  const analysisTableData = useSelectFromState(
    (state) => state.analysis.analysisTableData,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!analysisTableData) {
      dispatch(ANALYSIS_ACTIONS.loadAnalysisTableData());
    }
  }, [analysisTableData]);

  return {
    state: {
      analysisTableData,
    },
  };
}, 'withAnalysisTableData');
