import { withWebProductsContainer } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withWebProductsContainer';
import { withStoreFiltersData } from '@main/packages-web-storefront/src/modules/catalog/hoc/withStoreFiltersData';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import {
  combineHOC,
  UiExtension,
  useExtensionForHook,
} from '@web/ui-extension';
import React from 'react';

export default combineHOC(
  withWebProductsContainer,
  withStoreFiltersData
)(function Products(props) {
  useDebugRender('Products');
  const ProductsStack = useExtensionForHook('products', props);

  if (!props.products) {
    return (
      <div className="gl-grid">
        <UiExtension uiId="LOADING_INDICATOR" global={false}>
          {/*<div>Đang nạp dữ liệu sản phẩm ...</div>*/}
        </UiExtension>
      </div>
    );
  } else {
    return <div className="container">{ProductsStack}</div>;
  }
});
