import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const AMASTY_LANDING_PAGE: ExtensionConfig[] = [
  {
    uiId: 'AMASTY_LANDING_PAGE_CONTAINER',
    title: 'AMASTY_LANDING_PAGE',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./AmastyLandingPageContainer')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
  {
    uiId: 'AMASTY_LANDING_PAGEL_INFO',
    component: dynamic(() => import('./AmastyLandingPageInfo')),
    priorityFn: () => 90,
  },
  {
    uiId: 'AMASTY_LANDING_PAGE_BREADCRUMBS',
    component: dynamic(() => import('./AmastyLandingPageBreadcrumbs')),
    priorityFn: () => 100,
  },
];
