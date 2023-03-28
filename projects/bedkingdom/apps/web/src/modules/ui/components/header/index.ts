import HEADER_SEARCH_BAR_EXT_CFG from '@modules/ui/components/header/search-bar';
import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const DEFAULT_HEADER_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'DEFAULT_HEADER',
    component: dynamic(() => import('./DefaultHeader')),
  },
  ...HEADER_SEARCH_BAR_EXT_CFG,
];
