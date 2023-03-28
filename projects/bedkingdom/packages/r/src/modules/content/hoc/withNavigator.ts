import { useNavigator } from '@modules/content/hook/useNavigator';
import { createUiHOC } from '@web/ui-extension';

export const withNavigator = createUiHOC(() => useNavigator(), 'withNavigator');
