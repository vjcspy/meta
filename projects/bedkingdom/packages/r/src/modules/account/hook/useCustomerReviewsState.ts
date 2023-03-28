import { selectCustomerReviews } from '@modules/account/store/account.selector';
import { useSelector } from '@main/packages-web-redux';

export const useCustomerReviews = () => {
  const reviews = useSelector(selectCustomerReviews);

  return {
    state: {
      reviews,
    },
  };
};
