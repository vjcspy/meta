import { useBedKingdomContactActions } from '@extensions/bed-kingdom/hook/common/useBedKingdomContactActions';
import { createUiHOC } from '@web/ui-extension';

export const withBedKingdomContactActions = createUiHOC(() => {
  return useBedKingdomContactActions();
}, 'withBedKingdomContactActions');
