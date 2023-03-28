import { AccountState } from '@modules/account/store/account.state';

export const selectIsUpdatingCustomerInfo = (state: {
  account: AccountState;
}) => state.account?.loadingState?.info;
