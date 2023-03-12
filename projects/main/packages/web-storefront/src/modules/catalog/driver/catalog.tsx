import { storeManager } from '@main/packages-web-redux';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import { isDevelopment } from 'chitility/dist/util/environment';
import React from 'react';

import { productsReducer } from '../store/products';
import { WEB_CATALOG_PRODUCTS_EFFECTS } from '../store/products/products.effects';
storeManager.mergeReducers({
  products: productsReducer,
});
storeManager.addEpics('web-catalog', [...WEB_CATALOG_PRODUCTS_EFFECTS]);
export const withStorefrontCatalog = (PageComponent: any, options?: any) => {
  const WithStorefrontCatalog = React.memo((props) => {
    useDebugRender('WithWebCatalog');

    return (
      <>
        <PageComponent {...props} />
      </>
    );
  });

  wrapSSRFn(
    PageComponent,
    WithStorefrontCatalog,
    undefined,
    undefined,
    options?.ssr
  );

  if (isDevelopment()) {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'PageComponent';
    WithStorefrontCatalog.displayName = `withWebCatalog(${displayName})`;
  }

  return WithStorefrontCatalog;
};
