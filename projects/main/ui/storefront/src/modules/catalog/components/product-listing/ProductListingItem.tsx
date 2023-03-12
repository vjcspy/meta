import { UiExtension } from '@web/ui-extension';
import * as React from 'react';
import { useMemo } from 'react';

const ProductListingItem: React.FC<{
  product: any;
}> = React.memo((props) => {
  const Item = useMemo(() => {
    if (props.product) {
      if (props.product.__typename === 'SimpleProduct') {
        return (
          <UiExtension
            uiId="PRODUCT_LISTING_ITEM_SIMPLE"
            product={props.product}
          />
        );
      } else if (props.product.__typename === 'ConfigurableProduct') {
        return (
          <UiExtension
            uiId="PRODUCT_LISTING_ITEM_CONFIGURABLE"
            product={props.product}
          />
        );
      }
      console.warn(
        'Not yet support ' + props.product.__typename + ' when render listing'
      );
      return null;
    }
  }, [props.product?.id]);
  return <div className="gl-sectionProduct__item">{Item}</div>;
});

export default ProductListingItem;
