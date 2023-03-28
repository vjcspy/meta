import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import type { AccountState } from '@modules/account/store/account.state';
import {
  updateCustomerAction,
  updateCustomerAfterAction,
  updateCustomerFailAction,
} from '@modules/account/store/customer_update/actions';

export const updateCustomer = createBuilderCallback<AccountState>((builder) => {
  builder
    .addCase(updateCustomerAction, (state) => {
      state.loadingState.resetPassword = true;
    })
    .addCase(updateCustomerAfterAction, (state) => {
      state.loadingState.resetPassword = false;
    })
    .addCase(updateCustomerFailAction, (state) => {
      state.loadingState.resetPassword = false;
    });
});
