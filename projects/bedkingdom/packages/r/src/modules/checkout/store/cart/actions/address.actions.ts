import { createAction } from '@main/packages-web-redux/dist/util/createAction';
import type { AddressInput } from '@modules/checkout/types';

const PREFIX = 'CHECKOUT_CART_ADDRESS';

const CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS =
  'CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS';
export const checkoutCartSetShippingAddress = createAction<{
  customerAddressId?: string;
  address?: AddressInput;
  customerNotes?: string;
}>(CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS, PREFIX);

const CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS_AFTER =
  'CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS_AFTER';
export const checkoutCartSetShippingAddressAfter = createAction<{
  cart: any;
}>(CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS_AFTER, PREFIX);

const CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS_ERROR =
  'CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS_ERROR';
export const checkoutCartSetShippingAddressError = createAction<{
  error: Error;
}>(CHECKOUT_CART_ADDRESS_SET_SHIPPING_ADDRESS_ERROR, PREFIX);

const CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS =
  'CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS';
export const checkoutCartAddressSetBillingAddress = createAction<{
  address?: AddressInput;
  customerAddressId?: string;
  customerNotes?: string;
}>(CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS, PREFIX);

const CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS_AFTER =
  'CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS_AFTER';
export const checkoutCartAddressSetBillingAddressAfter = createAction<{
  cart: any;
}>(CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS_AFTER, PREFIX);

const CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS_ERROR =
  'CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS_ERROR';
export const checkoutCartAddressSetBillingAddressError = createAction<{
  error: Error;
}>(CHECKOUT_CART_ADDRESS_SET_BILLING_ADDRESS_ERROR, PREFIX);

const CHECKOUT_CART_ADDRESS_EDIT_ADDRESS_ACTION =
  'CHECKOUT_CART_ADDRESS_EDIT_ADDRESS_ACTION';
export const checkoutCartAddressEditAddressAction = createAction<{
  address?: AddressInput;
}>(CHECKOUT_CART_ADDRESS_EDIT_ADDRESS_ACTION, PREFIX);

const CHECKOUT_CART_ADDRESS_CANCEL_EDIT_ADDRESS_ACTION =
  'CHECKOUT_CART_ADDRESS_CANCEL_EDIT_ADDRESS_ACTION';
export const checkoutCartAddressCancelEditAddressAction = createAction(
  CHECKOUT_CART_ADDRESS_CANCEL_EDIT_ADDRESS_ACTION,
  PREFIX
);
