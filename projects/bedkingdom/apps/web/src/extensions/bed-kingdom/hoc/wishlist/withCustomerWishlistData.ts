import { useBedCustomerWishlistData } from '@extensions/bed-kingdom/hook/wishlist/useBedCustomerWishlistData';
import { createUiHOC } from '@web/ui-extension';

export const withBedCustomerWishlistData = createUiHOC(
  () => useBedCustomerWishlistData(),
  'withBedCustomerWishlistData'
);
