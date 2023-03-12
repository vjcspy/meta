import { UI_COMMON_EXT_CFG } from '@etc/ui/extension-config/common';
import { UI_STOREFRONT_CATALOG_EXT_CFG } from '@etc/ui/extension-config/storefront/catalog';
import { UI_STOREFRONT_CONTENT_EXT_CFG } from '@etc/ui/extension-config/storefront/content';
import { UI_TEST_EXT_CFG } from '@etc/ui/extension-config/ui-test';
import { HOME_PAGE_UI_CFG } from '@etc/ui/static-layout/home';
import { INFO_PAGE_UI_CFG } from '@etc/ui/static-layout/info';
import { PRODUCT_PAGE_UI_CFG } from '@etc/ui/static-layout/product';
import { ROOT_EXTENSION_CONFIG } from '@main/ui-common/src/components/root';
import { STACK_EXTENSION_CONFIG } from '@main/ui-common/src/components/stack';
import { UiManager } from '@web/ui-extension';
import { ExtensionPoint } from 'chitility/dist/lib/extension/extension-point';

UiManager.config({
  extensionConfigs: [
    ROOT_EXTENSION_CONFIG,
    STACK_EXTENSION_CONFIG,
    UI_TEST_EXT_CFG,
    UI_COMMON_EXT_CFG,
    UI_STOREFRONT_CONTENT_EXT_CFG,
    UI_STOREFRONT_CATALOG_EXT_CFG,
  ],
});

// Extend url as a path
ExtensionPoint.config(
  'storefront_default_layout',
  'resolveStaticLayout',
  (dataObject) => {
    const pathname = dataObject.getData('pathname');
    switch (pathname) {
      case 'index':
        dataObject.setData('extConfig', {
          type: 'CHIAKI_PAGE',
          id: null,
          config_data: HOME_PAGE_UI_CFG,
          additional_data: null,
          isResolved: true,
          pathname,
          requestedPathname: pathname,
          metadata: null,
        });
        return false;

      case 'info':
        dataObject.setData('extConfig', {
          type: 'CHIAKI_PAGE',
          id: null,
          config_data: INFO_PAGE_UI_CFG,
          additional_data: null,
          isResolved: true,
          pathname,
          requestedPathname: pathname,
          metadata: null,
        });
        return false;

      default:
        return true;
    }
  }
);

// Extend URL as a page which have been resolved from backend(such as PRODUCT, CATEGORY....)
ExtensionPoint.config(
  'product_page',
  'resolveChiakiPageResolver',
  (dataObject) => {
    const res = dataObject.getData('data');
    // Registry.getInstance().unregister('CATALOG_CATEGORY_ADDITION_FILTERS');
    if (res.chiakiPageResolver?.type === 'PRODUCT') {
      dataObject.setData('configData', PRODUCT_PAGE_UI_CFG);

      return false;
    }
    return true;
  }
);
