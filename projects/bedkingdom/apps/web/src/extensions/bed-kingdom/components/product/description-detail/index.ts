import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_PRODUCT_DETAIL_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'PRODUCT_DETAIL',
    component: dynamic(() => import('./Detail')),
  },
  {
    uiId: 'PRODUCT_CUSTOMER_QUESTION',
    component: dynamic(() => import('./CustomerQuestion')),
  },
  {
    uiId: 'PRODUCT_MORE_INFORMATION',
    component: dynamic(() => import('./MoreInformation')),
  },
  {
    uiId: 'PRODUCT_REVIEW',
    component: dynamic(() => import('./Review')),
  },
  {
    uiId: 'PRODUCT_REPORT_REVIEW',
    component: dynamic(() => import('./review-content/ReportReview')),
  },
  {
    uiId: 'PRODUCT_LIST_REVIEW',
    component: dynamic(() => import('./review-content/ListReview')),
  },
  {
    uiId: 'PRODUCT_OFFERS',
    component: dynamic(() => import('./Offers')),
  },
];
