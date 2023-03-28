import { storeManager } from '@main/packages-web-redux';
import { CHECKOUT_EFFECTS } from '@vjcspy/r/build/modules/checkout/store/checkout.effects';
import { checkoutReducer } from '@vjcspy/r/build/modules/checkout/store/checkout.reducer';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import React from 'react';

import { WEB_CHECKOUT_EFFECTS } from '../store/effects';

let _initCheckout = false;
storeManager.mergeReducers({
  checkout: checkoutReducer,
});
function initCheckout() {
  if (_initCheckout) return;

  storeManager.addEpics('web-checkout', [
    ...CHECKOUT_EFFECTS,
    ...WEB_CHECKOUT_EFFECTS,
  ]);

  _initCheckout = true;
}

initCheckout();

export const withWebCheckout = (
  PageComponent: any,
  webUiAdapterOptions?: any
): any => {
  const WithWebCheckout = React.memo((props: any) => {
    return (
      <>
        <PageComponent {...props} />
      </>
    );
  });
  wrapSSRFn(
    PageComponent,
    WithWebCheckout,
    undefined,
    undefined,
    webUiAdapterOptions?.ssr
  );

  const displayName =
    PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithWebCheckout.displayName = `withWebAccount(${displayName})`;

  return WithWebCheckout;
};
