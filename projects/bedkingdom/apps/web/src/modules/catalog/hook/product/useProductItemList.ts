import ROUTES from '@values/extendable/ROUTES';
import type { WishlistItemInput } from '@vjcspy/apollo';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export const useProductItemList = (props: any) => {
  const router = useRouter();

  const toggleWishlist = useCallback(
    (wishlistItem?: WishlistItemInput) => {
      if (props.state?.accountState?.customer) {
        let wishlistId = 0;
        if (
          props?.state?.accountState?.wishlist &&
          props?.state?.accountState?.wishlist[0]?.id
        ) {
          wishlistId = props?.state?.accountState?.wishlist[0]?.id;
        }
        if (props.state?.productInWishlist) {
          if (typeof props.actions.removeWishlistItem === 'function') {
            props.actions.removeWishlistItem(
              wishlistId,
              props?.state.productInWishlist.id
            );
          }
        } else {
          if (
            typeof props.actions.addProductsToWishlist === 'function' &&
            wishlistItem
          ) {
            props.actions.addBedProductsToWishlist(wishlistId, [wishlistItem]);
          }
        }
      } else {
        RouterSingleton.redirect(ROUTES.r('ACCOUNT_LOGIN'), router?.asPath);
      }
    },
    [props.state?.productInWishlist?.id, props.state?.accountState?.customer]
  );
  return {
    toggleWishlist,
  };
};
