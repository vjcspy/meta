import { AMASTY_XLANDING_PAGE_UI_CONFIG } from '@extensions/bed-kingdom/values/ext-cfg/AMASTY_XLANDING_PAGE';
import { BRAND_UI_CONFIG } from '@extensions/bed-kingdom/values/ext-cfg/brand';
import { BRAND_DETAIL_UI_CFG } from '@extensions/bed-kingdom/values/ext-cfg/brand-detail';
import { NOT_FOUND_UI_CFG } from '@extensions/bed-kingdom/values/ext-cfg/notfound';
import { ExtensionPoint, Registry } from 'chitility';

export const bedkingdomExtendUiExtCfg = () => {
  ExtensionPoint.config(
    'bedkingdom_brand',
    'resolveStaticLayout',
    (dataObject) => {
      Registry.getInstance().register('IS_BRAND_DETAIL_PAGE', false);
      // fix bug enter link brand not work
      // Registry.getInstance().unregister('CATALOG_CATEGORY_ADDITION_FILTERS');
      const pathname = dataObject.getData('pathname');
      if (pathname === 'brand') {
        dataObject.setData('extConfig', {
          type: 'CHIAKI_PAGE',
          id: null,
          config_data: BRAND_UI_CONFIG,
          additional_data: null,
          isResolved: true,
          pathname,
          metadata: null,
        });
        return false;
      } else if (
        typeof pathname === 'string' &&
        pathname.indexOf('brands/') === 0
      ) {
        Registry.getInstance().register('IS_BRAND_DETAIL_PAGE', true);
        dataObject.setData('extConfig', {
          type: 'CHIAKI_PAGE',
          id: null,
          config_data: BRAND_DETAIL_UI_CFG,
          additional_data: null,
          isResolved: true,
          pathname,
          metadata: null,
        });
        return false;
      }
      return true;
    }
  );

  ExtensionPoint.config(
    'amsty_ext',
    'resolveChiakiPageResolver',
    (dataObject) => {
      const res = dataObject.getData('data');
      Registry.getInstance().unregister('CATALOG_CATEGORY_ADDITION_FILTERS');
      if (res.chiakiPageResolver?.type === 'AMASTY_XLANDING_PAGE') {
        dataObject.setData('configData', AMASTY_XLANDING_PAGE_UI_CONFIG);

        return false;
      }
      return true;
    }
  );

  Registry.getInstance().register('404_UI_CONFIG', NOT_FOUND_UI_CFG);
};
