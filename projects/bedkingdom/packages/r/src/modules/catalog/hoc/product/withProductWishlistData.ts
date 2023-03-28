import { selectCustomerWishlist } from '@modules/account/store/wishlisht/wishlist.selector';
import { createUiHOC } from '@web/ui-extension';
import forEach from 'lodash/forEach';
import { useMemo } from 'react';
import { useSelector } from '@main/packages-web-redux';

export const withProductWishlistData = createUiHOC(
  (props: { product?: any; state?: { product: any } }) => {
    const wishlists = useSelector(selectCustomerWishlist);
    const productInWishlist = useMemo(() => {
      let _p = null;
      const product = props?.product ?? props?.state?.product;
      if (Array.isArray(wishlists) && product) {
        forEach(wishlists, (itemWishlists: any) => {
          const isExisted = itemWishlists?.items_v2?.items.find(
            (wI: any) => wI.product?.sku === product.sku
          );
          if (isExisted) {
            _p = isExisted;

            return false;
          }
        });
      }

      return _p;
    }, [wishlists, props.product?.sku, props?.state?.product?.sku]);

    return {
      state: {
        productInWishlist,
      },
    };
  },
  'withProductWishlistData'
);
