import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
import { withSelectIsPreparing } from '@vjcspy/r/build/modules/checkout/hoc/cart/withSelectIsPreparing';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const CustomizableOptions = combineHOC(
  withCurrentProductState,
  withSelectIsPreparing
)((props) => {
  const productOptions = useMemo(() => {
    let data = props?.state?.product?.options || [];
    if (
      props?.state?.productInfo?.configurable?.variants &&
      Array.isArray(props?.state?.productInfo?.configurable?.variants) &&
      props?.state?.productInfo?.configurable?.variants.length > 0
    ) {
      if (
        props?.state?.productInfo?.configurable?.variants[0]?.product?.options
      ) {
        data = [
          ...data,
          ...props?.state?.productInfo?.configurable?.variants[0]?.product
            ?.options,
        ];
      }
    }
    return data;
  }, [
    props?.state?.product,
    props?.state?.productInfo,
    props?.state?.productInfo?.configurable?.variants,
  ]);

  if (
    !Array.isArray(props?.state?.product?.options) &&
    productOptions.length === 0
  ) {
    return null;
  }

  return (
    <>
      <div className="b-mattress-inner text-center">
        {productOptions.map((option: any, key: any) => (
          <UiExtension
            key={props.state?.product['id'] + option['uid']}
            uiId="PRODUCT_TYPE_OPTIONS_CUSTOMIZABLE_OPTION"
            option={option}
            product={props.state.product}
            productInfo={props.state.productInfo}
            isPreparingProductId={props?.isPreparingProductId}
            indexKey={key}
          />
        ))}
      </div>
    </>
  );
});

export default CustomizableOptions;
