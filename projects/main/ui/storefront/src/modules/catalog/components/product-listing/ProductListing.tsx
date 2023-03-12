import { withProductsState } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withProductsState';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const ProductListing = combineHOC(withProductsState)(
  React.memo((props) => {
    if (props?.isUpdatingProducts) {
      return (
        <div style={{ height: '500px' }}>
          <UiExtension uiId="LOADING_INDICATOR" global={false} />
        </div>
      );
    }
    if (
      props?.isUpdatingProducts === false &&
      props?.products &&
      props?.products?.length === 0
    ) {
      return (
        <div className="gl-grid__item">Không tìm thấy sản phẩm phù hợp</div>
      );
    }

    const ProductListing = useMemo(() => {
      return (
        <div className="gl-grid">
          {props.products?.map((product) => {
            return (
              <div key={product.id} className="gl-grid__item">
                <UiExtension uiId="PRODUCT_LISTING_ITEM" product={product} />
              </div>
            );
          })}
        </div>
      );
    }, [props.products]);

    if (!props?.products) {
      return null;
    }

    return <>{ProductListing}</>;
  })
);

export default ProductListing;
