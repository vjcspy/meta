import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_DETAIL';

// Update Cart Item
const CHECKOUT_CART_DETAIL_UPDATE_ITEM = 'CHECKOUT_CART_DETAIL_UPDATE_ITEM';
export const updateCartItemAction = createAction<{
  cartId: string;
  cartItemId: number;
  qty: number;
}>(CHECKOUT_CART_DETAIL_UPDATE_ITEM, PREFIX);

const CHECKOUT_CART_DETAIL_MULTI_UPDATE_ITEM =
  'CHECKOUT_CART_DETAIL_MULTI_UPDATE_ITEM';
export const updateMultiCartItemAction = createAction<{
  cartId: string;
  dataItemsCart: any;
}>(CHECKOUT_CART_DETAIL_MULTI_UPDATE_ITEM, PREFIX);

const CHECKOUT_CART_DETAIL_MULTI_UPDATE_ITEM_AFTER =
  'CHECKOUT_CART_DETAIL_MULTI_UPDATE_ITEM_AFTER';
export const updateMultiCartItemAfterAction = createAction<{
  cart: any;
}>(CHECKOUT_CART_DETAIL_MULTI_UPDATE_ITEM_AFTER, PREFIX);

const CHECKOUT_CART_DETAIL_UPDATE_ITEM_AFTER =
  'CHECKOUT_CART_DETAIL_UPDATE_ITEM_AFTER';
export const updateCartItemAfterAction = createAction<{
  cart: any;
}>(CHECKOUT_CART_DETAIL_UPDATE_ITEM_AFTER, PREFIX);

const CHECKOUT_CART_DETAIL_UPDATE_ITEM_ERROR =
  'CHECKOUT_CART_DETAIL_UPDATE_ITEM_ERROR';
export const updateCartItemError = createAction<{
  error: any;
  cartItemId: number;
}>(CHECKOUT_CART_DETAIL_UPDATE_ITEM_ERROR, PREFIX);

// Remove Cart Item
const CHECKOUT_CART_DETAIL_REMOVE_ITEM = 'CHECKOUT_CART_DETAIL_REMOVE_ITEM';
export const checkoutCartDetailRemoveItemAction = createAction<{
  cartId: string;
  cartItemId: number;
}>(CHECKOUT_CART_DETAIL_REMOVE_ITEM);

const CHECKOUT_CART_DETAIL_REMOVE_ITEM_AFTER =
  'CHECKOUT_CART_DETAIL_REMOVE_ITEM_AFTER';
export const checkoutCartDetailRemoveItemAfterAction = createAction<{
  cart: any;
}>(CHECKOUT_CART_DETAIL_REMOVE_ITEM_AFTER);

const CHECKOUT_CART_DETAIL_REMOVE_ITEM_ERROR =
  'CHECKOUT_CART_DETAIL_REMOVE_ITEM_ERROR';
export const checkoutCartDetailRemoveItemErrorAction = createAction<{
  error: any;
  cartItemId: number;
}>(CHECKOUT_CART_DETAIL_REMOVE_ITEM_ERROR);

// Coupon Add
const CHECKOUT_CART_DETAIL_ADD_COUPON_CODE =
  'CHECKOUT_CART_DETAIL_ADD_COUPON_CODE';
const CHECKOUT_CART_DETAIL_ADD_COUPON_CODE_AFTER =
  'CHECKOUT_CART_DETAIL_ADD_COUPON_CODE_AFTER';
const CHECKOUT_CART_DETAIL_ADD_COUPON_CODE_ERROR =
  'CHECKOUT_CART_DETAIL_ADD_COUPON_CODE_ERROR';

export const checkoutCartDetailAddCouponCodeAction = createAction<{
  cartId: string;
  couponCode: string;
}>(CHECKOUT_CART_DETAIL_ADD_COUPON_CODE);
export const checkoutCartDetailAddCouponCodeAfterAction = createAction<{
  cart: any;
}>(CHECKOUT_CART_DETAIL_ADD_COUPON_CODE_AFTER);
export const checkoutCartDetailAddCouponCodeErrorAction = createAction<{
  error: any;
}>(CHECKOUT_CART_DETAIL_ADD_COUPON_CODE_ERROR);

// Coupon Remove
const CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE =
  'CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE';
const CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE_AFTER =
  'CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE_AFTER';
const CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE_ERROR =
  'CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE_ERROR';

export const checkoutCartDetailRemoveCouponCodeAction = createAction<{
  cartId: string;
}>(CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE);
export const checkoutCartDetailRemoveCouponCodeAfterAction = createAction<{
  cart: any;
}>(CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE_AFTER);
export const checkoutCartDetailRemoveCouponCodeErrorAction = createAction<{
  error: any;
}>(CHECKOUT_CART_DETAIL_REMOVE_COUPON_CODE_ERROR);
