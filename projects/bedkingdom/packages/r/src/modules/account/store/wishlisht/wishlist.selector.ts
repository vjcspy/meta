import { AccountState } from '../account.state';

export const selectIsLoadingWishlist = (state: { account: AccountState }) =>
  state.account?.loadingState?.getWishlist;

export const selectCustomerWishlist = (state: { account: AccountState }) =>
  state.account?.wishlist;

export const selectWishlistPaging = (state: { account: AccountState }) =>
  state.account?.wishlistPaging;
