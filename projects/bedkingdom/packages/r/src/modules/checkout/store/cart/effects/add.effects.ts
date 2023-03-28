import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { addProductsToCartAfter } from '@modules/checkout/store/cart/actions/add.actions';
import { getCartDetail } from '@modules/checkout/store/cart/actions/init.actions';
import { map } from 'rxjs/operators';

const beforeGetCartDetail$ = createEffect((action$) =>
  action$.pipe(
    ofType(addProductsToCartAfter),
    map((action) =>
      getCartDetail({
        cartId: action.payload.cartId,
      })
    )
  )
);

export const CHECKOUT_CART_ADD_EFFECTS = [beforeGetCartDetail$];
