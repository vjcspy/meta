import { useBedKingdomAccountGiftCart } from '@extensions/bed-kingdom/hook/account/useBedKingdomAccountGiftCart';
import { createUiHOC } from '@web/ui-extension';

export const withBedKingdomAccountGiftCart = createUiHOC(() => {
  return useBedKingdomAccountGiftCart();
}, 'withBedKingdomAccountGiftCart');
