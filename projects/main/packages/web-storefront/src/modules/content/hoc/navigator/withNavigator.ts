import { createUiHOC } from '@web/ui-extension';

import { useNavigatorContainer } from '../../hook/navigator';

export const withNavigator = createUiHOC(() => {
  return useNavigatorContainer();
}, 'withNavigator');
