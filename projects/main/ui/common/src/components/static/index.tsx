import type { ExtensionConfig } from '@web/ui-extension';
import { UiManager } from '@web/ui-extension';

import Info from './Info';

export const UI_STATIC_EXT_CFG: () => ExtensionConfig[] = () => [
  {
    uiId: '404',
    component: UiManager.delegateDynamicLoader(() => import('./NotFound')),
  },
  {
    uiId: 'INFO',
    component: Info,
  },
];
