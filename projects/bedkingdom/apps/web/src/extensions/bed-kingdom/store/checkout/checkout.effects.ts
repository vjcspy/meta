import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import {
  checkoutCartDetailAddCouponCodeAfterAction,
  checkoutCartDetailAddCouponCodeErrorAction,
  updateCartItemAfterAction,
  updateCartItemError,
} from '@vjcspy/r/build/modules/checkout/store/cart/actions/detail.actions';
import { getCartDetailError } from '@vjcspy/r/build/modules/checkout/store/cart/actions/init.actions';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

const updateItemSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(updateCartItemAfterAction),
    map(() => {
      AlertService.success('Item cart has been updated successfully.');
      return EMPTY;
    })
  )
);
const updateItemError$ = createEffect((action$) =>
  action$.pipe(
    ofType(updateCartItemError),
    map(() => {
      AlertService.error('An error occurred, please try again.');
      return EMPTY;
    })
  )
);
const checkoutCartDetailAddCouponCodeAfterAction$ = createEffect((action$) =>
  action$.pipe(
    ofType(checkoutCartDetailAddCouponCodeAfterAction),
    map(() => {
      AlertService.success('Your coupon was successfully applied.');
      return EMPTY;
    })
  )
);
const getCartDetailError$ = createEffect((action$) =>
  action$.pipe(
    ofType(getCartDetailError),
    map((action) => {
      if (RouterSingleton.pathname.includes('cart')) {
        if (
          Array.isArray(action?.payload?.error?.response?.errors) &&
          action?.payload?.error?.response?.errors.length > 0 &&
          action?.payload?.error?.response?.errors[0]?.message &&
          action?.payload?.error?.response?.errors[0]?.message !==
            'Some of the products are out of stock.' &&
          action?.payload?.error?.response?.errors[0]?.message !==
            'There are no source items with the in stock status.'
        ) {
          AlertService.error(
            action?.payload?.error?.response?.errors[0]?.message
          );
        }
      }

      return EMPTY;
    })
  )
);
const toastAddCouponFail$ = createEffect((action$) =>
  action$.pipe(
    ofType(checkoutCartDetailAddCouponCodeErrorAction),
    map((action) => {
      if (
        Array.isArray(action?.payload?.error?.response?.errors) &&
        action?.payload?.error?.response?.errors.length > 0 &&
        action?.payload?.error?.response?.errors[0]?.message
      ) {
        AlertService.error(
          action?.payload?.error?.response?.errors[0]?.message
        );
      }
      return EMPTY;
    })
  )
);

export const BEDKINGDOM_CHECKOUT_EFFECTS = [
  updateItemSuccess$,
  updateItemError$,
  getCartDetailError$,
  checkoutCartDetailAddCouponCodeAfterAction$,
  toastAddCouponFail$,
];
