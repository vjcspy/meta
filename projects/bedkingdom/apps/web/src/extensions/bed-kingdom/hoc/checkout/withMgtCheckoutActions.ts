import { useMgtCheckoutActions } from '@extensions/bed-kingdom/hook/checkout/useMgtCheckoutActions';
import { createUiHOC } from '@web/ui-extension';

export const withMgtCheckoutActions = createUiHOC(
  () => useMgtCheckoutActions(),
  'withMgtCheckoutActions'
);
