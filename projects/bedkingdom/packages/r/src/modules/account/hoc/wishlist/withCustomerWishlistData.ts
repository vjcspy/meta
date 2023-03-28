import { useCustomerWishlistData } from '@modules/account/hook/wishlist/useCustomerWishlistData';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerWishlistData = createUiHOC(
  () => useCustomerWishlistData(),
  'withCustomerWishlistData'
);
