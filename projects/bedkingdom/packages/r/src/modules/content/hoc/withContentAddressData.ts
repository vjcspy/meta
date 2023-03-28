import { useContentAddressData } from '@modules/content/hook/useContentAddressData';
import { createUiHOC } from '@web/ui-extension';

export const withContentAddressData = createUiHOC(
  () => useContentAddressData(),
  'withContentAddressData'
);
