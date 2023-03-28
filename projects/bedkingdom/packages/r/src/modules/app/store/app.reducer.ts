import { createReducer } from '@main/packages-web-redux';
import {
  appSaveReferUrl,
  decreaseCount,
  increaseCount,
} from '@modules/app/store/app.actions';
import { AppStateFactory } from '@modules/app/store/app.state';

export const appReducer = createReducer(AppStateFactory(), (builder) => {
  builder
    .addCase(increaseCount, (state, action) => {
      state.count = state.count + action.payload.number;
    })
    .addCase(decreaseCount, (state, action) => {
      state.count = state.count - action.payload.number;
    })
    .addCase(appSaveReferUrl, (state, action) => {
      state.referUrl = action.payload.url;
    });
});
