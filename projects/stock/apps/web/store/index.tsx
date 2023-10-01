import { combineReducers, configureStore } from '@reduxjs/toolkit';

import alertPrice from '@/store/alertPrice';
import themeConfigSlice from '@/store/themeConfigSlice';

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    alertPrice: alertPrice,
});

export default configureStore({
    reducer: rootReducer,
});

export type IRootState = ReturnType<typeof rootReducer>;
