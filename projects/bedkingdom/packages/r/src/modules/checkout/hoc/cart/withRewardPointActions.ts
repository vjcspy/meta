import { useRewardPointActions } from '@modules/checkout/hook/cart/useRewardPointActions';
import { createUiHOC } from '@web/ui-extension';

export const withRewardPointActions = createUiHOC(
  () => useRewardPointActions(),
  'withRewardPointActions'
);
