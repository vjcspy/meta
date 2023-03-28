import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_INIT';

const GET_CURRENT_CART = 'GET_CURRENT_CART';
export const getCurrentCart = createAction(GET_CURRENT_CART, PREFIX);

/* LOGGED CUSTOMER */

const GET_CUSTOMER_CART = 'GET_CUSTOMER_CART';
export const getCustomerCart = createAction<{
  token: string;
}>(GET_CUSTOMER_CART, PREFIX);

const GOT_CUSTOMER_CART = 'GOT_CUSTOMER_CART';
export const gotCustomerCart = createAction<{
  cartId: string;
}>(GOT_CUSTOMER_CART, PREFIX);

/* GUEST */

const GET_GUEST_CART = 'GET_GUEST_CART';
export const getGuestCart = createAction(GET_GUEST_CART, PREFIX);

const CHECK_GUEST_CART_IN_STORAGE = 'CHECK_GUEST_CART_IN_STORAGE';
export const checkGuestCartInStorage = createAction(
  CHECK_GUEST_CART_IN_STORAGE,
  PREFIX
);

const GOT_GUEST_CART_IN_STORAGE = 'GOT_GUEST_CART_IN_STORAGE';
export const gotGuestCartInStorage = createAction<{
  cartId: string;
}>(GOT_GUEST_CART_IN_STORAGE, PREFIX);

const EMPTY_GUEST_CART_IN_STORAGE = 'EMPTY_GUEST_CART_IN_STORAGE';
export const emptyGuestCartInStorage = createAction(
  EMPTY_GUEST_CART_IN_STORAGE,
  PREFIX
);

const CREATE_GUEST_EMPTY_CART = 'CREATE_GUEST_EMPTY_CART';
export const createGuestEmptyCart = createAction(
  CREATE_GUEST_EMPTY_CART,
  PREFIX
);

const CREATE_GUEST_EMPTY_CART_SUCCESS = 'CREATE_GUEST_EMPTY_CART_SUCCESS';
export const createGuestEmptyCartSuccess = createAction<{
  cartId: string;
}>(CREATE_GUEST_EMPTY_CART_SUCCESS, PREFIX);

const CREATE_GUEST_EMPTY_CART_FAIL = 'CREATE_GUEST_EMPTY_CART_FAIL';
export const createGuestEmptyCartFail = createAction<{
  error: Error;
}>(CREATE_GUEST_EMPTY_CART_FAIL, PREFIX);

const SAVE_GUEST_CART_TO_STORAGE_SUCCESS = 'SAVE_GUEST_CART_TO_STORAGE_SUCCESS';
export const saveGuestCartToStorageSuccess = createAction<{
  cartId: string;
}>(SAVE_GUEST_CART_TO_STORAGE_SUCCESS, PREFIX);

const SAVE_GUEST_CART_TO_STORAGE_FAIL = 'SAVE_GUEST_CART_TO_STORAGE_FAIL';
export const saveGuestCartToStorageFail = createAction<{ error: Error }>(
  SAVE_GUEST_CART_TO_STORAGE_FAIL,
  PREFIX
);

/* CART */
const MERGE_GUEST_CART = 'MERGE_GUEST_CART';
export const mergeGuestCart = createAction(MERGE_GUEST_CART, PREFIX);

const MERGE_GUEST_CART_AFTER = 'MERGE_GUEST_CART_AFTER';
export const mergeGuestCartAfter = createAction<{
  cartId: string;
}>(MERGE_GUEST_CART_AFTER, PREFIX);

const MERGE_GUEST_CART_ERROR = 'MERGE_GUEST_CART_ERROR';
export const mergeGuestCartError = createAction<{
  error: Error;
}>(MERGE_GUEST_CART_ERROR, PREFIX);

const GET_CART_DETAIL = 'GET_CART_DETAIL';
export const getCartDetail = createAction<{
  cartId: string;
}>(GET_CART_DETAIL, PREFIX);

const GET_CART_DETAIL_AFTER = 'GET_CART_DETAIL_AFTER';
export const getCartDetailAfter = createAction<{
  cart: any;
}>(GET_CART_DETAIL_AFTER, PREFIX);

const GET_CART_DETAIL_ERROR = 'GET_CART_DETAIL_ERROR';
export const getCartDetailError = createAction<{ error: any }>(
  GET_CART_DETAIL_ERROR,
  PREFIX
);
