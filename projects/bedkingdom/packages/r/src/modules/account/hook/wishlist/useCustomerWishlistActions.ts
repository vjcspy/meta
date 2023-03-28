import {
  addWishListAction,
  addWishListAfterAction,
  addWishListErrorAction,
  removeWishListAction,
  removeWishListAfterAction,
  removeWishListErrorAction,
} from '@modules/account/store/wishlisht/wishlist.actions';
import {
  useAddProductsToWishlistMutation,
  useRemoveProductsFromWishlistMutation,
} from '@vjcspy/apollo';
import { useCallback, useEffect } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCustomerWishlistActions = () => {
  const dispatch = useDispatch();
  const [removeWishlistMutation, removeWishlistRes] =
    useRemoveProductsFromWishlistMutation();

  const [addWishlistMutation, addWishlistRes] =
    useAddProductsToWishlistMutation();

  const removeWishlistItem = useCallback(
    async (wishlistId: any, wishlistItemId: any) => {
      if (removeWishlistRes?.loading === true) {
        return;
      }
      dispatch(
        removeWishListAction({
          wishlistId,
          wishlistItemId,
        })
      );
      try {
        await removeWishlistMutation({
          variables: {
            wishlistId,
            wishlistItemsIds: [wishlistItemId],
          },
        });
      } catch (e) {}
    },
    [removeWishlistRes?.loading]
  );

  useEffect(() => {
    if (removeWishlistRes.error) {
      dispatch(
        removeWishListErrorAction({
          error: removeWishlistRes.error,
        })
      );
    }

    if (removeWishlistRes.data?.removeProductsFromWishlist?.wishlist) {
      dispatch(
        removeWishListAfterAction({
          wishlist:
            removeWishlistRes.data?.removeProductsFromWishlist?.wishlist,
        })
      );
    }
  }, [
    removeWishlistRes.data?.removeProductsFromWishlist?.wishlist,
    addWishlistRes.error,
  ]);

  const addProductsToWishlist = useCallback(
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
      removeWishlistItem,
      addProductsToWishlist,
    },
  };
};
