import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { useSelectFromState } from '@src/store/selectFromState';
import { useAppDispatch } from '@src/store/useAppDispatch';
import { createUiHOC } from '@web/ui-extension/dist';
import { useEffect } from 'react';

export default createUiHOC(() => {
  const selectedMarketCat = useSelectFromState(
    (state) => state.analysis.selectedMarketCat,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ANALYSIS_ACTIONS.loadMarketTicks());
  }, [selectedMarketCat]);

  return {};
});
