import { BEDKINGDOM_ACCOUNT_EXTENSION_CONFIGS } from '@extensions/bed-kingdom/components/account';
import { AMASTY_LANDING_PAGE } from '@extensions/bed-kingdom/components/amasty-landing-page';
import { BED_BRAND_EXT_CFG } from '@extensions/bed-kingdom/components/brand';
import { BED_KINGDOM_BRAND_DETAIL_EXT_CFG } from '@extensions/bed-kingdom/components/brand-detail';
import { BED_CART_EXT_CFG } from '@extensions/bed-kingdom/components/cart';
import { BEDKINGDOM_CHECKOUT_EXT_CFG } from '@extensions/bed-kingdom/components/checkout';
import { BEDKINGDOM_CMS_PAGE_EXTENSION_CONFIGS } from '@extensions/bed-kingdom/components/cms-page';
import { BED_MUI_INPUT_CPT_CFG } from '@extensions/bed-kingdom/components/common/input-password';
import { BEDKING_ALERT_EXTENSION_CONFIG } from '@extensions/bed-kingdom/components/common/page-message';
import { BEDKING_ROOT_EXTENSION_CONFIG } from '@extensions/bed-kingdom/components/common/root';
import { BEDKING_STACK_EXTENSION_CONFIG } from '@extensions/bed-kingdom/components/common/stack';
import { TWO_COLUMNS_BEDKINGDOME_EXTENSION_CONFIG } from '@extensions/bed-kingdom/components/common/two-columns-bed';
import { ORDER_COMPLETE_EXT_CFG } from '@extensions/bed-kingdom/components/complete';
import { BEDKINGDOM_HEADER_EXT_CFG } from '@extensions/bed-kingdom/components/header';
import { BEDKINGDOM_HOME_PAGE_CONTENT_CFG } from '@extensions/bed-kingdom/components/home';
import { BEDKINGDOM_PRODUCT_EXT_CFG } from '@extensions/bed-kingdom/components/product';
import { BEDKINGDOM_PRODUCT_CFG } from '@extensions/bed-kingdom/components/product-listing';
import { BED_KINGDOM_PRODUCTS_EXT_CFG } from '@extensions/bed-kingdom/components/products';
import { SEO_BED_KINGDOM_EXT_CFG } from '@extensions/bed-kingdom/components/seo';
import { KINGDOMBED_STATIC_EXT_CFG } from '@extensions/bed-kingdom/components/static';
import { TRUST_PILOT_CFG } from '@extensions/bed-kingdom/components/trustpilot';
import CartDetail from '@extensions/bed-kingdom/schema/CartDetail';
import { BEDKINGDOM_ACCOUNT_EFFECTS } from '@extensions/bed-kingdom/store/account/account.effects';
import { BEDKINGDOM_CHECKOUT_EFFECTS } from '@extensions/bed-kingdom/store/checkout/checkout.effects';
import { bedContentReducer } from '@extensions/bed-kingdom/store/content/content.content.reducer';
import { BEDKINGDOM_PRODUCT_EFFECTS } from '@extensions/bed-kingdom/store/products/product.effects';
import { bedAmLabelReducer } from '@extensions/bed-kingdom/store/products/product.reducer';
import BED_KINGDOM_COMMON from '@extensions/bed-kingdom/values/BED_KINGDOM_COMMON';
import { bedkingdomExtendUiExtCfg } from '@extensions/bed-kingdom/values/ext-cfg';
import { combineReducers, storeManager } from '@main/packages-web-redux';
import { TEST_CPT_CFG } from '@modules/core/components';
import { UiManager } from '@web/ui-extension';
import { DataValueExtension } from 'chitility/dist/lib/extension/data-value-extension';

UiManager.config({
  extensionConfigs: [
    TEST_CPT_CFG,
    BEDKINGDOM_HEADER_EXT_CFG,
    TRUST_PILOT_CFG,
    KINGDOMBED_STATIC_EXT_CFG,
    BEDKINGDOM_PRODUCT_CFG,
    BEDKINGDOM_HOME_PAGE_CONTENT_CFG,
    BEDKING_STACK_EXTENSION_CONFIG,
    BED_KINGDOM_PRODUCTS_EXT_CFG,
    BEDKINGDOM_PRODUCT_EXT_CFG,
    BEDKINGDOM_ACCOUNT_EXTENSION_CONFIGS,
    TWO_COLUMNS_BEDKINGDOME_EXTENSION_CONFIG,
    BED_MUI_INPUT_CPT_CFG,
    BED_CART_EXT_CFG,
    BEDKINGDOM_CHECKOUT_EXT_CFG,
    BEDKING_ALERT_EXTENSION_CONFIG,
    ORDER_COMPLETE_EXT_CFG,
    BEDKINGDOM_CMS_PAGE_EXTENSION_CONFIGS,
    BED_BRAND_EXT_CFG,
    BED_KINGDOM_BRAND_DETAIL_EXT_CFG,
    SEO_BED_KINGDOM_EXT_CFG,
    BEDKING_ROOT_EXTENSION_CONFIG,
    AMASTY_LANDING_PAGE,
  ],
});

storeManager.mergeReducers({
  bed_king: combineReducers({
    content: bedContentReducer,
    am_label: bedAmLabelReducer,
  }),
});

storeManager.addEpics('bed-product', [...BEDKINGDOM_PRODUCT_EFFECTS]);
storeManager.addEpics('bed-account', [...BEDKINGDOM_ACCOUNT_EFFECTS]);
storeManager.addEpics('bed-checkout', [...BEDKINGDOM_CHECKOUT_EFFECTS]);

export function bootBedKingdom() {
  extendValues();
  bedkingdomExtendUiExtCfg();
}

function extendValues() {
  const PROXY_DEFAULT_URL_KEY = process.env.NEXT_PUBLIC_PROXY_DEFAULT_URL;
  const PROXY_APP_NAME = process.env.NEXT_PUBLIC_PROXY_APP_NAME;
  DataValueExtension.add(
    BED_KINGDOM_COMMON.BRAND_NAME,
    'COMMON',
    {
      BRAND_NAME: 'Bed Kingdom - UK Bed Store | Best Deals - Free Delivery',
      CONFIG_PREFIX: 'BEDKINGDOM',
    },
    10
  )
    .add(
      BED_KINGDOM_COMMON.BRAND_NAME,
      'REGISTRY',
      {
        PROXY_DEFAULT_URL_KEY,
        PROXY_APP_NAME,
        GRAPHQL_DEFAULT_URL_KEY: `${PROXY_DEFAULT_URL_KEY}/proxy/${PROXY_APP_NAME}/graphql`,
        PCMS_DEFAULT_URL_KEY: 'https://bedkingdom.co.uk',
        CLIENT_ID_KEY: 'YXBwbGljYXRpb25faWQ6YXBwbGljYXRpb25fc2VjcmV0',
        MGT_CE: true,
      },
      1
    )
    .add(
      BED_KINGDOM_COMMON.BRAND_NAME,
      'CART_DETAIL_SCHEMA',
      {
        query: CartDetail,
      },
      1
    );
}
