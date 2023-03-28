import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  createNewCustomerAddressAction,
  createNewCustomerAddressAfterAction,
  createNewCustomerAddressErrorAction,
  updateCustomerAddressAction,
  updateCustomerAddressAfterAction,
  updateCustomerAddressErrorAction,
} from '@modules/account/store/customer-address/actions';
import {
  checkoutCartAddressCancelEditAddressAction,
  checkoutCartAddressEditAddressAction,
  checkoutCartAddressSetBillingAddress,
  checkoutCartAddressSetBillingAddressAfter,
  checkoutCartAddressSetBillingAddressError,
  checkoutCartSetShippingAddress,
  checkoutCartSetShippingAddressAfter,
  checkoutCartSetShippingAddressError,
} from '@modules/checkout/store/cart/actions/address.actions';
import type { CartState } from '@modules/checkout/store/cart/cart.state';

export const checkoutAddressBuilderCallback = createBuilderCallback<CartState>(
  (builder) => {
    builder.addCase(checkoutCartSetShippingAddress, (state) => {
      state.isUpdatingAddress = true;
    });
    builder.addCase(checkoutCartAddressSetBillingAddress, (state) => {
      state.isUpdatingAddress = true;
    });
    builder
      .addCase(checkoutCartSetShippingAddressAfter, (state, action) => {
        state.cart = action.payload.cart;
        state.isUpdatingAddress = false;
        state.editingAddressObj = undefined;
      })
      .addCase(checkoutCartSetShippingAddressError, (state) => {
        state.isUpdatingAddress = false;
        state.editingAddressObj = undefined;
      });
    builder
      .addCase(checkoutCartAddressSetBillingAddressAfter, (state, action) => {
        state.cart = action.payload.cart;
        state.isUpdatingAddress = false;
        state.editingAddressObj = undefined;
      })
      .addCase(checkoutCartAddressSetBillingAddressError, (state) => {
        state.isUpdatingAddress = false;
        state.editingAddressObj = undefined;
      });

    // update address
    builder
      .addCase(checkoutCartAddressEditAddressAction, (state, action) => {
        state.editingAddressObj = action.payload.address;
      })
      .addCase(checkoutCartAddressCancelEditAddressAction, (state) => {
        state.editingAddressObj = undefined;
      })
      .addCase(updateCustomerAddressAction, (state) => {
        state.isUpdatingAddress = true;
      })
      .addCase(createNewCustomerAddressAction, (state) => {
        state.isUpdatingAddress = true;
      })
      .addCase(updateCustomerAddressAfterAction, (state) => {
        state.isUpdatingAddress = false;
      })
      .addCase(updateCustomerAddressErrorAction, (state) => {
        state.isUpdatingAddress = false;
      })
      .addCase(createNewCustomerAddressAfterAction, (state) => {
        state.isUpdatingAddress = false;
      })
      .addCase(createNewCustomerAddressErrorAction, (state) => {
        state.isUpdatingAddress = false;
      });
  }
);
