import { useCheckoutConfig } from '@modules/core-config/hook/useCheckoutConfig';
import { createUiHOC } from '@web/ui-extension';

export const withCheckoutConfig = createUiHOC(() => {
  return useCheckoutConfig();
}, 'withCheckoutConfig');
