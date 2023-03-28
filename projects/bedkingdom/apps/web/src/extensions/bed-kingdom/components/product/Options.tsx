import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const Options = combineHOC(withCurrentProductState)((props) => {
  if (
    (!Array.isArray(props?.state?.product?.options) &&
      (!props.state?.product?.hasOwnProperty('configurable_options') ||
        !Array.isArray(props.state?.product?.configurable_options))) ||
    props?.state?.product?.stock_status === 'OUT_OF_STOCK'
  ) {
    return null;
  }

  return (
    <div className="b-product-options-wrapper">
      <UiExtension uiId="PRODUCT_OPTIONS_CONFIGURABLE" />
      <UiExtension uiId="BEDKINGDOM_PRODUCT_OPTIONS_CUSTOMIZABLE" />
    </div>
  );
});

export default Options;
