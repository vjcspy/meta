import { useNavigator } from '@modules/content/hook/useNavigator';
import { createUiHOC } from '@web/ui-extension';

export const withAppNavigator = createUiHOC(
  () => useNavigator('APP_NAVIGATOR'),
  'withAppNavigator'
);
