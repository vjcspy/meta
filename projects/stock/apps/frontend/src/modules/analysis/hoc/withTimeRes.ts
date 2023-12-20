import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import type { TimeResolution } from '@stock/packages-com/dist/tick/merge-by-res';
import { createUiHOC } from '@web/ui-extension/dist';
import { useCallback } from 'react';

export default createUiHOC(() => {
  const timeRes = useSelectFromState((state) => state.analysis.timeRes);

  const dispatch = useAppDispatch();
  const setTimeRes = useCallback((timeRes: TimeResolution) => {
    dispatch(ANALYSIS_ACTIONS.setTimeRes({ timeRes }));
  }, []);

  return {
    state: { timeRes },
    actions: { setTimeRes },
  };
});
