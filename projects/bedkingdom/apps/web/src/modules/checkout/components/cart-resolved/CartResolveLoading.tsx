import { withIsResolvedCart } from '@vjcspy/r/build/modules/checkout/hoc/cart/withIsResolvedCart';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const CartResolveLoading = combineHOC(withIsResolvedCart)((props) => {
  return (
    <>
      {props.state?.isResolvedCart !== true && (
        <UiExtension uiId="LOADING_INDICATOR" global={true} defaultMessage />
      )}
    </>
  );
});

export default CartResolveLoading;
