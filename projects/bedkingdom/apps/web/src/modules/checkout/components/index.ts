import { CART_RESOLVED_EXT_CFG } from '@modules/checkout/components/cart-resolved';
import type { ExtensionConfig } from '@web/ui-extension';

export const CHECKOUT_CPT_EXT_CFG: ExtensionConfig[] = [
  ...CART_RESOLVED_EXT_CFG,
];
