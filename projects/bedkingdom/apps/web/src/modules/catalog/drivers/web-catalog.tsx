import { storeManager } from '@main/packages-web-redux';
import { webProductReducer } from '@modules/catalog/store/product/product.reducer';
import { WEB_CATALOG_PRODUCTS_EFFECTS } from '@modules/catalog/store/products/products.effects';
import { R_CATALOG_EFFECTS } from '@vjcspy/r/build/modules/catalog/store/product/product.effects';
import { productInfoReducer } from '@vjcspy/r/build/modules/catalog/store/product-info/product-info.reducer';
import { productsReducer } from '@vjcspy/r/build/modules/catalog/store/products/products.reducer';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import React from 'react';

let _initCatalog = false;

storeManager.mergeReducers({
  products: productsReducer,
  product: webProductReducer,
  productInfo: productInfoReducer,
});

function initCatalog() {
  if (_initCatalog) {
    return;
  }

  storeManager.addEpics('web-catalog', [
    ...R_CATALOG_EFFECTS,
    ...WEB_CATALOG_PRODUCTS_EFFECTS,
  ]);

  _initCatalog = true;
}

initCatalog();

export const withWebCatalog = (
  PageComponent: any,
  webUiAdapterOptions?: any
): any => {
  const WithWebCatalog = React.memo((props: any) => {
    useDebugRender('WithWebCatalog');

    return (
      <>
        <PageComponent {...props} />
      </>
    );
  });

  wrapSSRFn(
    PageComponent,
    WithWebCatalog,
    undefined,
    undefined,
    webUiAdapterOptions?.ssr
  );

  const displayName =
    PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithWebCatalog.displayName = `withWebCatalog(${displayName})`;

  return WithWebCatalog;
};
