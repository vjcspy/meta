import { CHECKOUT_CART_EFFECTS } from '@modules/checkout/store/cart/cart.effects';
import { CHECKOUT_REORDER_EFFECTS } from '@modules/checkout/store/cart/effects/reorder.effects';

export const CHECKOUT_EFFECTS = [
  ...CHECKOUT_CART_EFFECTS,
  ...CHECKOUT_REORDER_EFFECTS,
];
