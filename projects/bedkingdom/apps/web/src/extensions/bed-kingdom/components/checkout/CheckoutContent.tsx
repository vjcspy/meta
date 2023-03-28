import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const CheckoutContent: React.FC = combineHOC()(() => {
  return (
    <div className="grid-checkout grid md:grid-cols-2 md:gap-4">
      <div className="b-checkout-step grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <UiExtension uiId="BEDKINGDOM_CHECKOUT_ADDRESS" />
        <UiExtension uiId="BEDKINGDOM_CHECKOUT_SHIPPING_BILLING" />
      </div>
      <UiExtension uiId="BEDKINGDOM_CHECKOUT_SUMMARY" />
    </div>
  );
});

export default CheckoutContent;
