import { selectCustomerWishlist } from '@vjcspy/r/build/modules/account/store/wishlisht/wishlist.selector';
import { createUiHOC } from '@web/ui-extension';
import forEach from 'lodash/forEach';
import { useCallback, useMemo } from 'react';
import { useSelector } from '@main/packages-web-redux';

export const withProductWishlistDataCheckout = createUiHOC(() => {
  const wishlists = useSelector(selectCustomerWishlist);
  const productInWishlistCheck = useCallback(
    (sku: any) => {
      let _p = null;
      if (Array.isArray(wishlists) && sku) {
        forEach(wishlists, (itemWishlists: any) => {
          const isExisted = itemWishlists?.items_v2?.items.find(
            (wI: any) => wI.product?.sku === sku
          );
          if (isExisted) {
            _p = isExisted;

            return false;
          }
        });
      }

      return _p;
    },
    [wishlists]
  );

  return {
    actions: {
      productInWishlistCheck,
    },
  };
}, 'withProductWishlistDataCheckout');
