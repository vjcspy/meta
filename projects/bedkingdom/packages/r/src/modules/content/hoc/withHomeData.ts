import { useHomeData } from '@modules/content/hook/useHomeData';
import { createUiHOC } from '@web/ui-extension';

export const withHomeData = createUiHOC(() => useHomeData(), 'withHomeData');
