import alertPriceSlice from '@src/store/alertPrice.slice';
import analysisSlice from '@src/store/analysis.slice';
import themeConfigSlice from '@src/store/themeConfigSlice';
import { createStoreManager } from '@stock/packages-redux';

const storeManager = createStoreManager({
  themeConfig: themeConfigSlice,
  alertPrice: alertPriceSlice,
  analysis: analysisSlice,
});

export default storeManager;

export type IRootState = ReturnType<typeof storeManager.getStateType>;
