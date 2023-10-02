import { combineReducers, configureStore } from '@reduxjs/toolkit';

import alertPriceSlice from '@/store/alertPrice.slice';
import analysisSlice from '@/store/analysis.slice';
import themeConfigSlice from '@/store/themeConfigSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    alertPrice: alertPriceSlice,
    analysis: analysisSlice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
