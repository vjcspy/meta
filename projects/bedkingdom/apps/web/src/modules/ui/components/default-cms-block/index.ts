import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const CMS_BLOCK_DEFAULT_CONFIG: ExtensionConfig[] = [
  {
    uiId: 'CMS_BLOCKS',
    component: dynamic(() => import('./CmsBlockDefault')),
  },
];
