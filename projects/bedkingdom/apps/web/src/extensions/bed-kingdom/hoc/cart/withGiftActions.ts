import { useGiftActions } from '@extensions/bed-kingdom/hook/cart/useGiftActions';
import { createUiHOC } from '@web/ui-extension';

export const withGiftActions = createUiHOC(
  () => useGiftActions(),
  'withGiftActions'
);
