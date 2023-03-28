import { useMyOrdersPaging } from '@modules/account/hook/my-orders/useMyOrdersPaging';
import { createUiHOC } from '@web/ui-extension';

export const withMyOrdersPaging = createUiHOC(
  () => useMyOrdersPaging(),
  'withMyOrdersPaging'
);
