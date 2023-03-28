import { AccountState } from './account.state';

export const selectAccount = (state: { account: AccountState }) =>
  state.account;

export const selectCustomerAddress = (state: { account: AccountState }) =>
  state.account?.customer?.addresses ?? [];

export const selectLoadingState = (state: { account: AccountState }) =>
  state.account?.loadingState;

export const selectResolvedAccountState = (state: { account: AccountState }) =>
  state.account.isResolvedCustomerState;

export const selectCustomer = (state: { account: AccountState }) =>
  state.account.customer;

export const selectCustomerReviews = (state: { account: AccountState }) =>
  state.account.reviews;

export const selectRewardPoints = (state: { account: AccountState }) =>
  state.account?.customer?.reward_points;

export const selectStoreCredit = (state: { account: AccountState }) =>
  state.account.store_credit;
