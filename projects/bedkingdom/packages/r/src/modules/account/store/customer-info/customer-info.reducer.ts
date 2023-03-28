import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  updateCustomerInfoAction,
  updateCustomerInfoAfterAction,
  updateCustomerInfoErrorAction,
} from '@modules/account/store/customer-info/customer.info.actions';

import type { AccountState } from '../account.state';

export const customerInfoReducer = createBuilderCallback<AccountState>(
  (builder) => {
    builder
      .addCase(updateCustomerInfoAction, (state) => {
        state.loadingState.info = true;
      })
      .addCase(updateCustomerInfoAfterAction, (state, action) => {
        state.customer = action.payload.customer;
        state.loadingState.info = false;
      })
      .addCase(updateCustomerInfoErrorAction, (state) => {
        state.loadingState.info = false;
      });
  }
);
