import { createAction, generateAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CART';

const SET_CART_MESSAGE = 'SET_CART_MESSAGE';
export const setCartMessageAction = createAction<{
  message: any;
}>(SET_CART_MESSAGE, PREFIX);

const CLEAR_CART_MESSAGE = 'CLEAR_CART_MESSAGE';
export const clearCartMessageAction = createAction(CLEAR_CART_MESSAGE, PREFIX);

const OPEN_CART_DETAIL = 'OPEN_CART_DETAIL';
export const openCartDetail = createAction(OPEN_CART_DETAIL, PREFIX);

const CLOSE_CART_DETAIL = 'CLOSE_CART_DETAIL';
export const closeCartDetail = createAction(CLOSE_CART_DETAIL, PREFIX);

const GO_TO_CART = 'GO_TO_CART';
const goToCartAction = generateAction(GO_TO_CART, PREFIX);
export const goToCartAfterAction = goToCartAction.AFTER;
