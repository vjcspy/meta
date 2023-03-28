import { CHECKOUT_CPT_EXT_CFG } from '@modules/checkout/components';
import { UiManager } from '@web/ui-extension';

UiManager.config({
  extensionConfigs: [CHECKOUT_CPT_EXT_CFG],
});
export function bootCheckout() {}
