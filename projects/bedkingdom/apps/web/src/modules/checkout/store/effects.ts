import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { addProductsToCartAfter } from '@vjcspy/r/build/modules/checkout/store/cart/actions/add.actions';
import {
  checkoutCartDetailAddCouponCodeAfterAction,
  checkoutCartDetailAddCouponCodeErrorAction,
  checkoutCartDetailRemoveCouponCodeAfterAction,
  checkoutCartDetailRemoveItemErrorAction,
  updateCartItemError,
} from '@vjcspy/r/build/modules/checkout/store/cart/actions/detail.actions';
import { EMPTY } from 'rxjs';
import { map, mapTo, tap } from 'rxjs/operators';

const toastAfterAddSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(addProductsToCartAfter),
    tap(() => {
      // const successMessage = translate('add_to_bag_success', {
      //   ns: ['checkout'],
      // });
      // _successToast(successMessage);
    }),
    mapTo(EMPTY)
  )
);

const toastAddCouponSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(checkoutCartDetailAddCouponCodeAfterAction),
    map(() => {
      // const successMessage = translate('add_coupon_success', {
      //   ns: ['checkout'],
      // });
      // _successToast(successMessage);
      return EMPTY;
    })
  )
);

const toastRemoveCouponSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(checkoutCartDetailRemoveCouponCodeAfterAction),
    map(() => {
      // const successMessage = translate('remove_coupon_success', {
      //   ns: ['checkout'],
      // });
      // _successToast(successMessage);
      return EMPTY;
    })
  )
);

const toastAddCouponFail$ = createEffect((action$) =>
  action$.pipe(
    ofType(checkoutCartDetailAddCouponCodeErrorAction),
    map(() => {
      // const successMessage = translate('add_coupon_fail', {
      //   ns: ['checkout'],
      // });
      // _errorToast(successMessage);
      return EMPTY;
    })
  )
);

const checkoutCartRemoveItemError$ = createEffect((action$) =>
  action$.pipe(
    ofType(checkoutCartDetailRemoveItemErrorAction),
    map((error) => {
      // const message =
      //   error?.payload?.error?.response?.errors[0]?.message ||
      //   error?.payload?.error?.message;
      // _errorToast(message);
      return EMPTY;
    })
  )
);

const updateCartItemError$ = createEffect((action$) =>
  action$.pipe(
    ofType(updateCartItemError),
    map((error) => {
      // const message =
      //   error?.payload?.error?.response?.errors[0]?.message ||
      //   error?.payload?.error?.message;
      // _errorToast(message);
      return EMPTY;
    })
  )
);

export const WEB_CHECKOUT_EFFECTS = [
  toastAfterAddSuccess$,
  toastAddCouponSuccess$,
  toastAddCouponFail$,
  toastRemoveCouponSuccess$,
  checkoutCartRemoveItemError$,
  updateCartItemError$,
];
