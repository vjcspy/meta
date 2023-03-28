import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  deleteCustomerAddressAction,
  deleteCustomerAddressAfterAction,
  deleteCustomerAddressErrorAction,
  getCustomerAddressAfterAction,
} from '@modules/account/store/customer-address/actions';

import type { AccountState } from '../account.state';

export const customerAddressBuilderCallBack =
  createBuilderCallback<AccountState>((builder) => {
    builder
      .addCase(getCustomerAddressAfterAction, (state, action) => {
        if (state.customer) {
          state.customer.addresses = action.payload.addresses;
          if (action.payload.customer) {
            state.customer = action.payload.customer;
          }
        }
      })
      .addCase(deleteCustomerAddressAction, (state, action) => {
        state.deletingAddressId = action.payload.id;
      })
      .addCase(deleteCustomerAddressAfterAction, (state) => {
        state.deletingAddressId = undefined;
      })
      .addCase(deleteCustomerAddressErrorAction, (state) => {
        state.deletingAddressId = undefined;
      });
  });
