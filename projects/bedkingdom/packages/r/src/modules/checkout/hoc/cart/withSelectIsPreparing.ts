import { useSelectIsPreparing } from '@modules/checkout/hook/cart/useSelectIsPreparing';
import { createUiHOC } from '@web/ui-extension';

export const withSelectIsPreparing = createUiHOC(
  () => useSelectIsPreparing(),
  'withSelectIsPreparing'
);
