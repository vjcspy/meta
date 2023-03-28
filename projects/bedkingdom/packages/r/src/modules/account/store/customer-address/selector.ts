import { AccountState } from '../account.state';

export const selectDeletingAddressId = (state: { account: AccountState }) =>
  state.account.deletingAddressId;

export const selectDefaultShippingAddressId = (state: {
  account: AccountState;
}) => state.account?.customer?.default_shipping;
