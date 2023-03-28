import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_ORDER';

const PLACE_ORDER = 'PLACE_ORDER';
export const placeOrder = createAction<{
  resolveByEffect: boolean;
}>(PLACE_ORDER, PREFIX);

const PLACE_ORDER_AFTER = 'PLACE_ORDER_AFTER';
export const placeOrderAfter = createAction<{
  order: any;
}>(PLACE_ORDER_AFTER, PREFIX);

const PLACE_ORDER_ERROR = 'PLACE_ORDER_ERROR';
export const placeOrderError = createAction<{
  error: Error;
}>(PLACE_ORDER_ERROR, PREFIX);

const GET_URL_VN_PAY = 'GET_URL_VN_PAY';
export const getUrlAction = createAction<{
  order_number: any;
}>(GET_URL_VN_PAY, PREFIX);

const GET_URL_VN_PAY_AFTER = 'GET_URL_VN_PAY_AFTER';
export const getUrlAfterAction = createAction<{
  url: any;
}>(GET_URL_VN_PAY_AFTER, PREFIX);

const GET_URL_VN_PAY_ERROR = 'GET_URL_VN_PAY_ERROR';
export const getUrlErrorAction = createAction<{
  error: Error;
}>(GET_URL_VN_PAY_ERROR, PREFIX);
