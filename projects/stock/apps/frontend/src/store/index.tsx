import { configAnalysisEffects } from '@src/modules/analysis/store/analysis.effects';
import { analysisSlice } from '@src/modules/analysis/store/analysis.reducer';
import themeConfigSlice from '@src/store/themeConfigSlice';
import { createStoreManager } from '@stock/packages-redux';

const storeManager = createStoreManager({
  themeConfig: themeConfigSlice,
  analysis: analysisSlice.reducer,
});

configAnalysisEffects(storeManager);

export default storeManager;

export type IRootState = ReturnType<typeof storeManager.getStateType>;
export type TypeStore = ReturnType<typeof storeManager.getStore>;
