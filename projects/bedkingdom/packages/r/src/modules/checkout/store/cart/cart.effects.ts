import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { setPaymentMethodError } from '@modules/checkout/store/cart/actions/payment-method.actions';
import { CHECKOUT_CART_ADD_EFFECTS } from '@modules/checkout/store/cart/effects/add.effects';
import { CHECKOUT_CART_ADD_CONFIGURABLE_EFFECTS } from '@modules/checkout/store/cart/effects/add-type/configurable';
import { CHECKOUT_CART_ADD_SIMPLE_EFFECTS } from '@modules/checkout/store/cart/effects/add-type/simple';
import { CHECKOUT_CART_ADDRESS } from '@modules/checkout/store/cart/effects/address.effects';
import { CHECKOUT_CART_COUPON } from '@modules/checkout/store/cart/effects/coupon.effects';
import { CHECKOUT_CART_DETAIL_EFFECTS } from '@modules/checkout/store/cart/effects/detail.effects';
import { CHECKOUT_CART_INIT_EFFECTS } from '@modules/checkout/store/cart/effects/init.effects';
import { CHECKOUT_ORDER_EFFECTS } from '@modules/checkout/store/cart/effects/order.effects';
import { CHECKOUT_CART_PAYMENT_METHOD } from '@modules/checkout/store/cart/effects/payment-method.effects';
import { CHECKOUT_CART_SHIPPING_METHOD_EFFECTS } from '@modules/checkout/store/cart/effects/shipping-method.effects';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

const setMessageWhenSetPaymentError$ = createEffect((action$) =>
  action$.pipe(
    ofType(setPaymentMethodError),
    map((action: any) => {
      console.log(action);
      return EMPTY;
    })
  )
);

export const CHECKOUT_CART_EFFECTS = [
  setMessageWhenSetPaymentError$,
  ...CHECKOUT_CART_INIT_EFFECTS,
  ...CHECKOUT_CART_DETAIL_EFFECTS,

  /* ADD TO CART */
  ...CHECKOUT_CART_ADD_EFFECTS,
  ...CHECKOUT_CART_ADD_SIMPLE_EFFECTS,
  ...CHECKOUT_CART_ADD_CONFIGURABLE_EFFECTS,

  /* ADDRESS */
  ...CHECKOUT_CART_ADDRESS,

  /* SHIPPING METHOD*/
  ...CHECKOUT_CART_SHIPPING_METHOD_EFFECTS,

  /* PAYMENT METHOD */
  ...CHECKOUT_CART_PAYMENT_METHOD,

  /* ORDER */
  ...CHECKOUT_ORDER_EFFECTS,

  ...CHECKOUT_CART_COUPON,
];
