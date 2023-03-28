import { selectStoreCredit } from '@modules/account/store/account.selector';
import { useSelector } from '@main/packages-web-redux';

export const useStoreCredit = () => {
  const store_credit = useSelector(selectStoreCredit);

  return {
    state: {
      store_credit,
    },
  };
};
