import { useCustomerWishlistActions } from '@modules/account/hook/wishlist/useCustomerWishlistActions';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerWishlistActions = createUiHOC(
  () => useCustomerWishlistActions(),
  'withCustomerWishlistActions'
);
