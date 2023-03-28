import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const CheckoutOnePage: React.FC = combineHOC()((props) => {
  return (
    <section className="b-checkout-page container mx-auto px-4">
      <UiExtension uiId="BEDKINGDOM_CHECKOUT_GUARD" />
      <UiExtension uiId="BEDKINGDOM_CHECKOUT_HEADER" />
      <UiExtension uiId="BEDKINGDOM_CHECKOUT_SECURE" />
      <UiExtension uiId="BEDKINGDOM_CHECKOUT_CONTENT" />
      <UiExtension uiId="BEDKINGDOM_CHECKOUT_SUGGEST_PRODUCTS" />
    </section>
  );
});

export default CheckoutOnePage;
