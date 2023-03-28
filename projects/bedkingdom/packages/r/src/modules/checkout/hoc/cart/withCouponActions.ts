import { useCouponActions } from '@modules/checkout/hook/cart/useCouponActions';
import { createUiHOC } from '@web/ui-extension';

export const withCouponActions = createUiHOC(
  () => useCouponActions(),
  'withCouponActions'
);
