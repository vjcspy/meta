import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import {
  generateCustomerTokenFail,
  generateCustomerTokenSuccessAction,
  registerCustomerByEmailPasswordFail,
} from '@vjcspy/r/build/modules/account/store/account.actions';
import {
  requestPasswordResetAfterAction,
  resetPasswordAfterAction,
  resetPasswordFailAction,
} from '@vjcspy/r/build/modules/account/store/customer_reset_password/actions';
import {
  addWishListAfterAction,
  addWishListErrorAction,
  removeWishListAfterAction,
  removeWishListErrorAction,
} from '@vjcspy/r/build/modules/account/store/wishlisht/wishlist.actions';
import Router from 'next/router';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

const errorMessge$ = createEffect((action$) =>
  action$.pipe(
    ofType(registerCustomerByEmailPasswordFail),
    map((action) => {
      if (action?.payload?.error?.message) {
        // _errorToast(action?.payload?.error?.message);
      }
      return EMPTY;
    })
  )
);

const resetPasswordSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(resetPasswordAfterAction),
    switchMap(() => {
      Router.push({
        pathname: `/account-login`,
      });

      return EMPTY;
    })
  )
);

const resetPasswordError$ = createEffect((action$) =>
  action$.pipe(
    ofType(resetPasswordFailAction),
    map(() => {
      // show toast reset password success
      // _errorToast(message);
      return EMPTY;
    })
  )
);

const forgetPasswordSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(requestPasswordResetAfterAction),
    map(() => {
      // show toast reset password success
      // _successToast(message);
      return EMPTY;
    })
  )
);

const forgetPasswordError$ = createEffect((action$) =>
  action$.pipe(
    ofType(requestPasswordResetAfterAction),
    map(() => {
      // show toast reset password success
      // _errorToast(message);
      return EMPTY;
    })
  )
);

const addWishlistSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(addWishListAfterAction),
    map(() => {
      // _successToast(successMessage);
      return EMPTY;
    })
  )
);
const addWishlistError$ = createEffect((action$) =>
  action$.pipe(
    ofType(addWishListErrorAction),
    map(() => {
      // _errorToast(errorMessage);
      return EMPTY;
    })
  )
);

const removeWishlistSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(removeWishListAfterAction),
    map(() => {
      // _successToast(successMessage);
      return EMPTY;
    })
  )
);
const removeWishlistError$ = createEffect((action$) =>
  action$.pipe(
    ofType(removeWishListErrorAction),
    map(() => {
      // _errorToast(errorMessage);
      return EMPTY;
    })
  )
);

const generateCustomerSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(generateCustomerTokenSuccessAction),
    map(() => {
      return EMPTY;
    })
  )
);

const generateCustomerFail$ = createEffect((action$) =>
  action$.pipe(
    ofType(generateCustomerTokenFail),
    map((action) => {
      // _errorToast(
      //   action?.payload?.error?.message ||
      //     translate('login_fail', {
      //       ns: 'customer',
      //     })
      // );
      return EMPTY;
    })
  )
);

export const WEB_ACCOUNT_EFFECTS = [
  errorMessge$,
  resetPasswordSuccess$,
  resetPasswordError$,
  addWishlistSuccess$,
  addWishlistError$,
  removeWishlistSuccess$,
  removeWishlistError$,
  forgetPasswordSuccess$,
  forgetPasswordError$,
  generateCustomerSuccess$,
  generateCustomerFail$,
];
