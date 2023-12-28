import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension/dist';
import { useEffect } from 'react';

export default createUiHOC(() => {
  const dispatch = useAppDispatch();
  const vnIndexes = useSelectFromState((state) => state.analysis.vnindexes);

  useEffect(() => {
    if (!vnIndexes) {
      dispatch(ANALYSIS_ACTIONS.loadVNINDEX());
    }
  }, [vnIndexes]);

  return {
    state: { vnIndexes },
  };
});
