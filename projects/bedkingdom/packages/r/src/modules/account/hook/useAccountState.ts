import { selectAccount } from '@modules/account/store/account.selector';
import { useSelector } from '@main/packages-web-redux';

export const useAccountState = () => {
  const accountState = useSelector(selectAccount);

  return {
    state: {
      accountState,
    },
  };
};
