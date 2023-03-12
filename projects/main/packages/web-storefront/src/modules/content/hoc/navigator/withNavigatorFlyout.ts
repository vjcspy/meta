import { createUiHOC } from '@web/ui-extension';

import { useNavigatorFlyoutContainer } from '../../hook/navigator';

export const withNavigatorFlyout = createUiHOC(() => {
  return useNavigatorFlyoutContainer();
}, 'withNavigatorFlyout');
