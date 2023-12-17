import { useSelectFromState } from '@src/store/selectFromState';
import { createUiHOC } from '@web/ui-extension/dist';

export default createUiHOC(() => {
  const selectedMarketCat = useSelectFromState(
    (state) => state.analysis.selectedMarketCat,
  );

  return {
    state: {
      selectedMarketCat,
    },
  };
});
