import { useGetBedkingdomWishlistDetailLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { selectCustomer } from '@vjcspy/r/build/modules/account/store/account.selector';
import { WishlistPaging } from '@vjcspy/r/build/modules/account/store/account.state';
import {
  getWishListAction,
  getWishListAfterAction,
  getWishListErrorAction,
} from '@vjcspy/r/build/modules/account/store/wishlisht/wishlist.actions';
import {
  selectCustomerWishlist,
  selectIsLoadingWishlist,
  selectWishlistPaging,
} from '@vjcspy/r/build/modules/account/store/wishlisht/wishlist.selector';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useBedCustomerWishlistData = () => {
  const wishlists = useSelector(selectCustomerWishlist);
  const wishlistPaging = useSelector(selectWishlistPaging);
  const isLoading = useSelector(selectIsLoadingWishlist);
  const customer = useSelector(selectCustomer);
  const dispatch = useDispatch();
  const [pageInfoRes, setPageInfoRes] =
    useState<WishlistPaging>(wishlistPaging);

  const setPageSizeAction = useCallback((data: number) => {
    if (data) {
      setPageInfoRes((prevState) => ({
        ...prevState,
        pageSize: data,
        currentPage: 1,
      }));
    }
  }, []);
  const setPageCurrentAction = useCallback((data: number) => {
    if (data) {
      setPageInfoRes((prevState) => ({ ...prevState, currentPage: data }));
    }
  }, []);
  const [getWishlistQuery, getWishlistRes] =
    useGetBedkingdomWishlistDetailLazyQuery({
      fetchPolicy: 'network-only',
    });
  useEffect(() => {
    if (!!customer && (!wishlists || wishlists.length === 0)) {
      dispatch(getWishListAction());
      getWishlistQuery({
        variables: {
          pageSize: wishlistPaging?.pageSize || 10,
          currentPage: wishlistPaging?.currentPage || 1,
        },
      });
    }
  }, [customer]);

  useEffect(() => {
    if (!!customer) {
      dispatch(getWishListAction());
      getWishlistQuery({
        variables: {
          pageSize: pageInfoRes?.pageSize,
          currentPage: pageInfoRes?.currentPage,
        },
      });
    }
  }, [pageInfoRes, customer]);

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
      currentPage: pageInfoRes?.currentPage,
      pageSize: pageInfoRes?.pageSize,
    },
    actions: {
      setPageSizeAction,
      setPageCurrentAction,
    },
  };
};
