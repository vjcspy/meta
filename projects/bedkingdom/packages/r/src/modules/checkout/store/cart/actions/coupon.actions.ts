import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_CART_COUPON';

const APPLY_COUPON = 'APPLY_COUPON';
export const applyCouponToCartAction = createAction<{
  cart_id: string;
  coupon_code: string;
}>(APPLY_COUPON, PREFIX);

const APPLY_COUPON_AFTER = 'APPLY_COUPON_AFTER';
export const applyCouponToCartAfterAction = createAction<{
  cart: any;
}>(APPLY_COUPON_AFTER, PREFIX);

const APPLY_COUPON_ERROR = 'APPLY_COUPON_ERROR';
export const applyCouponToCartErrorAction = createAction<{
  error: Error;
}>(APPLY_COUPON_ERROR, PREFIX);

const REMOVE_COUPON = 'REMOVE_COUPON';
export const removeCouponFromCartAction = createAction<{
  cart_id: string;
}>(REMOVE_COUPON, PREFIX);

const REMOVE_COUPON_AFTER = 'REMOVE_COUPON_AFTER';
export const removeCouponFromCartAfterAction = createAction<{
  cart: any;
}>(REMOVE_COUPON_AFTER, PREFIX);

const REMOVE_COUPON_ERROR = 'REMOVE_COUPON_ERROR';
export const removeCouponFromCartErrorAction = createAction<{
  error: Error;
}>(REMOVE_COUPON_ERROR, PREFIX);
