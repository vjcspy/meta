import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'bed_king_cart_gift';

const BED_APPLY_GIFT_TO_CART = 'BED_APPLY_GIFT_TO_CART';
export const bedApplyGiftToCartAction = createAction<any>(
  BED_APPLY_GIFT_TO_CART,
  PREFIX
);

const BED_APPLY_GIFT_TO_CART_AFTER = 'BED_APPLY_GIFT_TO_CART_AFTER';
export const bedApplyGiftToCartAfterAction = createAction<{
  cart: any;
}>(BED_APPLY_GIFT_TO_CART_AFTER, PREFIX);

const BED_APPLY_GIFT_TO_CART_ERROR = 'BED_APPLY_GIFT_TO_CART_ERROR';
export const bedApplyGiftToCartErrorAction = createAction<{
  error: Error;
}>(BED_APPLY_GIFT_TO_CART_ERROR, PREFIX);

const BED_REMOVE_GIFT_TO_CART = 'BED_REMOVE_GIFT_TO_CART';
export const bedRemoveGiftToCartAction = createAction<any>(
  BED_REMOVE_GIFT_TO_CART,
  PREFIX
);

const BED_REMOVE_GIFT_TO_CART_AFTER = 'BED_REMOVE_GIFT_TO_CART_AFTER';
export const bedRemoveGiftToCartAfterAction = createAction<{
  cart: any;
}>(BED_REMOVE_GIFT_TO_CART_AFTER, PREFIX);

const BED_REMOVE_GIFT_TO_CART_ERROR = 'BED_REMOVE_GIFT_TO_CART_ERROR';
export const bedRemoveGiftToCartErrorAction = createAction<{
  error: Error;
}>(BED_REMOVE_GIFT_TO_CART_ERROR, PREFIX);
