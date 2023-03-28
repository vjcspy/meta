import { useContentAddressActions } from '@modules/content/hook/useContentAddressActions';
import { createUiHOC } from '@web/ui-extension';

export const withContentAddressActions = createUiHOC(
  () => useContentAddressActions(),
  'withContentAddressActions'
);
