import { selectCustomer } from '@modules/account/store/account.selector';
import {
  getWishListAction,
  getWishListAfterAction,
  getWishListErrorAction,
} from '@modules/account/store/wishlisht/wishlist.actions';
import {
  selectCustomerWishlist,
  selectIsLoadingWishlist,
} from '@modules/account/store/wishlisht/wishlist.selector';
import { useGetWishlistDetailLazyQuery } from '@vjcspy/apollo';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useCustomerWishlistData = () => {
  const wishlists = useSelector(selectCustomerWishlist);
  const isLoading = useSelector(selectIsLoadingWishlist);
  const customer = useSelector(selectCustomer);
  const dispatch = useDispatch();
  const [getWishlistQuery, getWishlistRes] = useGetWishlistDetailLazyQuery({
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (!!customer && (!wishlists || wishlists.length === 0)) {
      dispatch(getWishListAction());
      getWishlistQuery({});
    }
  }, [customer]);

  useEffect(() => {
    if (getWishlistRes.error) {
      dispatch(
        getWishListErrorAction({
          error: getWishlistRes.error,
        })
      );
    }

    if (getWishlistRes?.data?.customer?.wishlists) {
      dispatch(
        getWishListAfterAction({
          wishlists: getWishlistRes?.data?.customer?.wishlists,
        })
      );
    }
  }, [getWishlistRes?.data?.customer?.wishlists, getWishlistRes.error]);

  return {
    state: {
      wishlists,
      isLoading,
    },
  };
};
