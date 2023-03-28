import { useAddBedProductsToWishlistMutation } from '@vjcspy/apollo-bed-kingdom';
import {
  addWishListAction,
  addWishListAfterAction,
  addWishListErrorAction,
} from '@vjcspy/r/build/modules/account/store/wishlisht/wishlist.actions';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useBedCustomerWishlistActions = () => {
  const dispatch = useDispatch();

  const [addWishlistMutation, addWishlistRes] =
    useAddBedProductsToWishlistMutation();

  const addBedProductsToWishlist = useCallback(
    async (wishlistId: any, wishlistItems: any) => {
      if (addWishlistRes?.loading === true) {
        return;
      }
      dispatch(addWishListAction());
      try {
        await addWishlistMutation({
          variables: {
            wishlistId,
            wishlistItems,
          },
        });
      } catch (e) {}
    },
    [addWishlistRes?.loading]
  );

  useEffect(() => {
    if (addWishlistRes.error) {
      dispatch(
        addWishListErrorAction({
          error: addWishlistRes.error,
        })
      );
    }
    if (addWishlistRes.data?.addProductsToWishlist?.wishlist) {
      dispatch(
        addWishListAfterAction({
          wishlist: addWishlistRes.data?.addProductsToWishlist?.wishlist,
        })
      );
    }
  }, [
    addWishlistRes.data?.addProductsToWishlist?.wishlist,
    addWishlistRes.error,
  ]);

  return {
    actions: {
      addBedProductsToWishlist,
    },
  };
};
