import { useBedKingdomAccountActions } from '@extensions/bed-kingdom/hook/account/useBedKingdomAccountActions';
import { createUiHOC } from '@web/ui-extension';

export const withBedKingdomAccountActions = createUiHOC(() => {
  return useBedKingdomAccountActions();
}, 'withBedKingdomAccountActions');
