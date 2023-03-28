import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  addWishListAction,
  addWishListAfterAction,
  addWishListErrorAction,
  getWishListAction,
  getWishListAfterAction,
  getWishListErrorAction,
  removeWishListAction,
  removeWishListAfterAction,
  removeWishListErrorAction,
} from '@modules/account/store/wishlisht/wishlist.actions';
import map from 'lodash/map';

import type { AccountState } from '../account.state';

export const myWishlistBuilderCallback = createBuilderCallback<AccountState>(
  (builder) => {
    builder
      .addCase(getWishListAction, (state) => {
        state.loadingState.getWishlist = true;
      })
      .addCase(getWishListAfterAction, (state, action) => {
        state.loadingState.getWishlist = false;
        state.wishlist = action.payload.wishlists;
      })
      .addCase(getWishListErrorAction, (state) => {
        state.loadingState.getWishlist = false;
      })
      .addCase(removeWishListAction, (state) => {
        state.loadingState.getWishlist = true;
        state.loadingState.loadingWishlist = true;
      })
      .addCase(removeWishListAfterAction, (state, action) => {
        state.loadingState.getWishlist = false;
        state.wishlist = map(state.wishlist, (item) => {
          if (item.id === action.payload.wishlist.id) {
            return action.payload.wishlist;
          } else {
            return item;
          }
        });
        state.loadingState.loadingWishlist = false;
      })
      .addCase(removeWishListErrorAction, (state) => {
        state.loadingState.getWishlist = false;
        state.loadingState.loadingWishlist = false;
      })
      .addCase(addWishListAction, (state) => {
        state.loadingState.getWishlist = true;
        state.loadingState.loadingWishlist = true;
      })
      .addCase(addWishListAfterAction, (state, action) => {
        state.loadingState.getWishlist = false;
        if (Array.isArray(state.wishlist) && state.wishlist.length === 0) {
          state.wishlist = [action.payload.wishlist] || [];
        } else {
          state.wishlist = map(state.wishlist, (item) => {
            if (item.id === action.payload.wishlist.id) {
              return action.payload.wishlist;
            } else {
              return item;
            }
          });
        }

        state.loadingState.loadingWishlist = false;
      })
      .addCase(addWishListErrorAction, (state) => {
        state.loadingState.getWishlist = false;
        state.loadingState.loadingWishlist = false;
      });
  }
);
