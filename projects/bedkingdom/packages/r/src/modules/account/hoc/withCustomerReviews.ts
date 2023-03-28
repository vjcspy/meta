import { useCustomerReviews } from '@modules/account/hook/useCustomerReviewsState';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerReviews = createUiHOC(
  () => useCustomerReviews(),
  'withCustomerReviews'
);
