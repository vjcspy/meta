import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_SHIPPING_METHOD';

const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';
export const setPaymentMethod = createAction<{
  methodCode: string;
}>(SET_PAYMENT_METHOD, PREFIX);

const SET_PAYMENT_METHOD_AFTER = 'SET_PAYMENT_METHOD_AFTER';
export const setPaymentMethodAfter = createAction<{
  cart: any;
}>(SET_PAYMENT_METHOD_AFTER, PREFIX);

const SET_PAYMENT_METHOD_ERROR = 'SET_PAYMENT_METHOD_ERROR';
export const setPaymentMethodError = createAction<{
  error: Error;
}>(SET_PAYMENT_METHOD_ERROR, PREFIX);

const GET_PAYMENT_METHOD = 'GET_PAYMENT_METHOD';
export const getPaymentMethod = createAction(GET_PAYMENT_METHOD, PREFIX);

const GET_PAYMENT_METHOD_AFTER = 'GET_PAYMENT_METHOD_AFTER';
export const getPaymentMethodAfter = createAction<{
  cart: any;
}>(GET_PAYMENT_METHOD_AFTER, PREFIX);

const GET_PAYMENT_METHOD_ERROR = 'GET_PAYMENT_METHOD_ERROR';
export const getPaymentMethodError = createAction<{
  error: Error;
}>(GET_PAYMENT_METHOD_ERROR, PREFIX);
