import { AccountState } from '@modules/account/store/account.state';

export const selectOrders = (state: { account: AccountState }) =>
  state.account.orders;

export const selectOrdersPageFilter = (state: { account: AccountState }) =>
  state.account?.ordersPageFilter;

export const selectOrderDetail = (state: { account: AccountState }) =>
  state.account.orderDetail;
