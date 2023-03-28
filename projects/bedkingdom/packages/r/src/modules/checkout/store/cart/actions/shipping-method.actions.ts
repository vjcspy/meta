import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_SHIPPING_METHOD';

const SET_SHIPPING_METHOD = 'SET_SHIPPING_METHOD';
export const setShippingMethod = createAction<{
  carrierCode: string;
  methodCode: string;
}>(SET_SHIPPING_METHOD, PREFIX);

const SET_SHIPPING_METHOD_AFTER = 'SET_SHIPPING_METHOD_AFTER';
export const setShippingMethodAfter = createAction<{
  cart: any;
}>(SET_SHIPPING_METHOD_AFTER, PREFIX);

const SET_SHIPPING_METHOD_ERROR = 'SET_SHIPPING_METHOD_ERROR';
export const setShippingMethodError = createAction<{
  error: Error;
}>(SET_SHIPPING_METHOD_ERROR, PREFIX);
