import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import ROUTES from '@values/extendable/ROUTES';
import {
  addWishListAfterAction,
  addWishListErrorAction,
  removeWishListAfterAction,
  removeWishListErrorAction,
} from '@vjcspy/r/build/modules/account/store/wishlisht/wishlist.actions';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

const addWishlistSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(addWishListAfterAction),
    map(() => {
      AlertService.success('Product has been added to your Wish List.');
      RouterSingleton.push(ROUTES.r('MY_ACCOUNT_WISHLIST'));
      return EMPTY;
    })
  )
);
const addWishlistError$ = createEffect((action$) =>
  action$.pipe(
    ofType(addWishListErrorAction),
    map(() => {
      return EMPTY;
    })
  )
);

const removeWishlistSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(removeWishListAfterAction),
    map(() => {
      AlertService.success('Product has been removed to your Wish List.');
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

export const BEDKINGDOM_PRODUCT_EFFECTS = [
  addWishlistSuccess$,
  addWishlistError$,
  removeWishlistSuccess$,
  removeWishlistError$,
];
