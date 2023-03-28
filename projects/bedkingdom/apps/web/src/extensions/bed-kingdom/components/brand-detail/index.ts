import {
  ExtensionConfig,
  ExtensionCustomizeType,
  ExtensionType,
} from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BED_KINGDOM_BRAND_DETAIL_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'BRAND_DETAIL_STACK',
    title: 'Brand detail stack',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./BrandDetailContainer')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
  {
    uiId: 'BRAND_DETAIL_INFO',
    component: dynamic(() => import('./BrandInfo')),
    priorityFn: () => 90,
  },
  {
    uiId: 'BRAND_DETAIL_BREADCRUMBS',
    uiTags: ['PRODUCTS_BREADCRUMBS'],
    component: dynamic(() => import('./BrandDetailBreadcrumbs')),
    priorityFn: () => 100,
  },
];
