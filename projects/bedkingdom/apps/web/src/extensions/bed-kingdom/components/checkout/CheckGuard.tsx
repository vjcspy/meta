import { withAccountState } from '@vjcspy/r/build/modules/account/hoc/withAccountState';
import { withInitAccountState } from '@vjcspy/r/build/modules/account/hoc/withInitAccountState';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useEffect } from 'react';

const CheckGuard = combineHOC(
  withCheckoutCartData,
  withAccountState,
  withInitAccountState
)((props) => {
  useEffect(() => {
    if (props.state?.isResolvedCart && props.state.isResolvedAccountState) {
      if (
        !props.state.accountState?.token ||
        !props.state.cart?.total_quantity ||
        props.state.cart?.total_quantity === 0
      ) {
        RouterSingleton.push('/cart');
      }
    }
  }, [props.state.isResolvedCart, props.state.isResolvedAccountState]);

  return (
    <>
      {(!props.state.accountState.isResolvedCustomerState ||
        !props.state.isResolvedCart) && (
        <UiExtension uiId="LOADING_INDICATOR" global={true} defaultMessage />
      )}
    </>
  );
});

export default CheckGuard;
