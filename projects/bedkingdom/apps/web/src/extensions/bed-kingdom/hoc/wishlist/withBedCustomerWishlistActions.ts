import { useBedCustomerWishlistActions } from '@extensions/bed-kingdom/hook/wishlist/useBedCustomerWishlistActions';
import { createUiHOC } from '@web/ui-extension';

export const withBedCustomerWishlistActions = createUiHOC(
  () => useBedCustomerWishlistActions(),
  'withBedCustomerWishlistActions'
);
