import type { ExtensionConfig } from '@web/ui-extension';

import UrlRewrite from './url-rewrite';

export const URL_REWRITE_CPT: ExtensionConfig[] = [
  {
    uiId: 'URL_REWRITE',
    uiTags: ['URL_REWRITE'],
    component: UrlRewrite,
    priorityFn: () => 99,
  },
];
