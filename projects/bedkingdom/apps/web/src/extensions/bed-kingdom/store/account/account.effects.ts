import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import ROUTES from '@values/extendable/ROUTES';
import { generateCustomerTokenFail } from '@vjcspy/r/build/modules/account/store/account.actions';
import {
  requestPasswordResetAfterAction,
  requestPasswordResetFailAction,
  resetPasswordAfterAction,
  resetPasswordFailAction,
} from '@vjcspy/r/build/modules/account/store/customer_reset_password/actions';
import {
  updateCustomerAfterAction,
  updateCustomerFailAction,
} from '@vjcspy/r/build/modules/account/store/customer_update/actions';
import {
  createNewCustomerAddressAfterAction,
  createNewCustomerAddressErrorAction,
  deleteCustomerAddressAfterAction,
  deleteCustomerAddressErrorAction,
  updateCustomerAddressAfterAction,
  updateCustomerAddressErrorAction,
} from '@vjcspy/r/build/modules/account/store/customer-address/actions';
import {
  reorderCartAfterAction,
  reorderCartErrorAction,
} from '@vjcspy/r/build/modules/checkout/store/cart/actions/reorder.actions';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

const generateCustomerTokenFail$ = createEffect((action$) =>
  action$.pipe(
    ofType(generateCustomerTokenFail),
    map(() => {
      AlertService.error(
        'The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.'
      );
      return EMPTY;
    })
  )
);
const updateCustomerAfter$ = createEffect((action$) =>
  action$.pipe(
    ofType(updateCustomerAfterAction),
    map(() => {
      AlertService.success('Successfully updated account information.');
      return EMPTY;
    })
  )
);

const updateCustomerFail$ = createEffect((action$) =>
  action$.pipe(
    ofType(updateCustomerFailAction),
    map(() => {
      AlertService.error('Account information update failed.');
      return EMPTY;
    })
  )
);

const updateCustomerAddressAfter$ = createEffect((action$) =>
  action$.pipe(
    ofType(updateCustomerAddressAfterAction),
    map(() => {
      AlertService.success('You saved the address.');
      return EMPTY;
    })
  )
);

const updateCustomerAddressError$ = createEffect((action$) =>
  action$.pipe(
    ofType(updateCustomerAddressErrorAction),
    map(() => {
      AlertService.error('An error occurred, please try again.');
      return EMPTY;
    })
  )
);

const deleteCustomerAddressAfter$ = createEffect((action$) =>
  action$.pipe(
    ofType(deleteCustomerAddressAfterAction),
    map(() => {
      AlertService.success('You deleted the address.');
      return EMPTY;
    })
  )
);

const deleteCustomerAddressError$ = createEffect((action$) =>
  action$.pipe(
    ofType(deleteCustomerAddressErrorAction),
    map((action) => {
      AlertService.error(
        action?.payload?.error?.message ??
          'An error occurred, please try again.'
      );
      return EMPTY;
    })
  )
);

const createNewCustomerAddressAfter$ = createEffect((action$) =>
  action$.pipe(
    ofType(createNewCustomerAddressAfterAction),
    map(() => {
      AlertService.success('You created the address.');
      return EMPTY;
    })
  )
);

const createNewCustomerAddressError$ = createEffect((action$) =>
  action$.pipe(
    ofType(createNewCustomerAddressErrorAction),
    map(() => {
      AlertService.error('An error occurred, please try again.');
      return EMPTY;
    })
  )
);

const reorderCartAfter$ = createEffect((action$) =>
  action$.pipe(
    ofType(reorderCartAfterAction),
    map(() => {
      AlertService.success('Successfully redeemed order.');
      RouterSingleton.push('/' + ROUTES.r('CART'));
      return EMPTY;
    })
  )
);

const reorderCartError$ = createEffect((action$) =>
  action$.pipe(
    ofType(reorderCartErrorAction),
    map(() => {
      AlertService.error('An error occurred, please try again.');
      return EMPTY;
    })
  )
);

const requestPasswordResetAfter$ = createEffect((action$) =>
  action$.pipe(
    ofType(requestPasswordResetAfterAction),
    map(() => {
      AlertService.success(
        'If there is an account associated you will receive an email with a link to reset your password.'
      );
      return EMPTY;
    })
  )
);

const requestPasswordResetFail$ = createEffect((action$) =>
  action$.pipe(
    ofType(requestPasswordResetFailAction),
    map((action) => {
      AlertService.error(
        action?.payload?.error?.message ??
          'An error occurred, please try again.'
      );
      return EMPTY;
    })
  )
);

const tokenError$ = createEffect((action$) =>
  action$.pipe(
    ofType(
      requestPasswordResetFailAction,
      reorderCartErrorAction,
      createNewCustomerAddressErrorAction,
      deleteCustomerAddressErrorAction,
      updateCustomerAddressErrorAction,
      updateCustomerFailAction
    ),
    map((action) => {
      if (
        action?.payload?.error?.message &&
        action?.payload?.error?.message.includes(
          "The current customer isn't authorized."
        )
      ) {
        RouterSingleton.push('/' + ROUTES.r('ACCOUNT_LOGIN'));
      }
      return EMPTY;
    })
  )
);

const resetPasswordSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(resetPasswordAfterAction),
    map(() => {
      AlertService.success('You updated your password.');
      return EMPTY;
    })
  )
);

const resetPasswordError$ = createEffect((action$) =>
  action$.pipe(
    ofType(resetPasswordFailAction),
    map((action) => {
      AlertService.error(
        action?.payload?.error?.message ??
          'Unable to change password at this time.'
      );
      return EMPTY;
    })
  )
);

export const BEDKINGDOM_ACCOUNT_EFFECTS = [
  generateCustomerTokenFail$,
  updateCustomerAfter$,
  updateCustomerFail$,
  updateCustomerAddressAfter$,
  updateCustomerAddressError$,
  deleteCustomerAddressAfter$,
  deleteCustomerAddressError$,
  createNewCustomerAddressAfter$,
  createNewCustomerAddressError$,
  reorderCartAfter$,
  reorderCartError$,
  requestPasswordResetAfter$,
  requestPasswordResetFail$,
  tokenError$,
  resetPasswordSuccess$,
  resetPasswordError$,
];
