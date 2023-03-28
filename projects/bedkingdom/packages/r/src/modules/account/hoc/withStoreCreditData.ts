import { useStoreCredit } from '@modules/account/hook/useStoreCredit';
import { createUiHOC } from '@web/ui-extension';

export const withStoreCreditData = createUiHOC(
  () => useStoreCredit(),
  'withStoreCredit'
);
