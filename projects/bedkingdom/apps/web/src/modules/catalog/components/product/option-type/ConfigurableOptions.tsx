import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
import { withSelectIsPreparing } from '@vjcspy/r/build/modules/checkout/hoc/cart/withSelectIsPreparing';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const ConfigurableOptions = combineHOC(
  withCurrentProductState,
  withSelectIsPreparing
)((props) => {
  if (
    !props.state?.product?.hasOwnProperty('configurable_options') ||
    !Array.isArray(props.state?.product?.configurable_options)
  ) {
    return null;
  }
  return (
    <>
      {props.state?.product?.configurable_options.map((option: any) => (
        <UiExtension
          key={option['uid']}
          uiId="PRODUCT_TYPE_OPTIONS_CONFIGURABLE_OPTION"
          option={option}
          product={props.state.product}
          productInfo={props.state.productInfo}
          isPreparingProductId={props?.isPreparingProductId}
        />
      ))}
    </>
  );
});

export default ConfigurableOptions;
