import { PRICE_CPT } from '@modules/catalog/components/Price';
import { PRODUCT_EXT_CFG } from '@modules/catalog/components/product';
import { PRODUCTS_EXT_CFG } from '@modules/catalog/components/products';
import { UiManager } from '@web/ui-extension';

UiManager.config({
  extensionConfigs: [PRICE_CPT, PRODUCTS_EXT_CFG, PRODUCT_EXT_CFG],
});

export function bootCatalog() {}
