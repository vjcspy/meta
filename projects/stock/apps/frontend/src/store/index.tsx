import alertPriceSlice from '@src/store/alertPrice.slice';
import analysisSlice from '@src/store/analysis.slice';
import themeConfigSlice from '@src/store/themeConfigSlice';
import { combineReducers, configureStore } from '@stock/packages-redux';

const rootReducer = combineReducers({
  themeConfig: themeConfigSlice,
  alertPrice: alertPriceSlice,
  analysis: analysisSlice,
});

export default configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
