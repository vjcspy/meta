import { withProductsState } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withProductsState';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const ProductListing = combineHOC(withProductsState)(
  React.memo((props) => {
    if (
      props?.isUpdatingProducts === false &&
      props?.syncProducts &&
      props?.syncProducts?.length === 0
    ) {
      return (
        <div className="gl-grid__item">Không tìm thấy sản phẩm phù hợp</div>
      );
    }

    const ProductListing = useMemo(() => {
      if (!props?.syncProducts) {
        return null;
      }
      return (
        <div className="gl-grid">
          {props?.syncProducts?.map((product: any) => {
            return (
              <div key={product.id} className="gl-grid__item">
                <UiExtension uiId="PRODUCT_LISTING_ITEM" product={product} />
              </div>
            );
          })}
        </div>
      );
    }, [props.products]);

    return <>{ProductListing}</>;
  })
);

export default ProductListing;
