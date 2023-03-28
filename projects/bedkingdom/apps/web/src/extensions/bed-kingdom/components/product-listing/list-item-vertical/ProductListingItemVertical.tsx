import { UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';
import LazyLoad from 'react-lazyload';

const ProductListingItemVertical: React.FC<{ product: any }> = (props) => {
  const Item = useMemo(() => {
    if (props.product) {
      if (props.product.__typename === 'SimpleProduct') {
        return (
          <UiExtension
            uiId="PRODUCT_LISTING_ITEM_VERTICAL_SIMPLE"
            product={props.product}
          />
        );
      } else if (props.product.__typename === 'ConfigurableProduct') {
        return (
          <UiExtension
            uiId="PRODUCT_LISTING_ITEM_VERTICAL_CONFIGURABLE"
            product={props.product}
          />
        );
      }
      console.warn(
        'Not yet support ' + props.product.__typename + ' when render listing'
      );
      return null;
    }
  }, [props.product?.uid]);

  return (
    <>
      {/*<LazyLoad once={true} height={200} offset={[-100, 0]} debounce={2000}>*/}
      {Item}
      {/*</LazyLoad>*/}
    </>
  );
};

export default ProductListingItemVertical;
