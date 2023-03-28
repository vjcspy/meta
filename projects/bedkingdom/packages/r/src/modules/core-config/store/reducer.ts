import { createReducer } from '@main/packages-web-redux';

import { getCheckoutConfigAfter } from './actions';
import { CoreConfigFactory } from './state';

export const configReducer = createReducer(CoreConfigFactory(), (builder) => {
  builder.addCase(getCheckoutConfigAfter, (state, action) => {
    state.checkout = action.payload.checkout;
  });
});
