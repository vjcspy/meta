import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKINGDOM_CMS_PAGE_EXTENSION_CONFIGS: ExtensionConfig[] = [
  {
    uiId: 'CUSTOMER_SERVICE',
    component: dynamic(() => import('./CustomerService')),
  },
  {
    uiId: 'CMS_CONTACT',
    component: dynamic(() => import('./Contact')),
  },
  {
    uiId: 'COMPLAINT_INFORMATION',
    component: dynamic(() => import('./ComplaintInformation')),
  },
  {
    uiId: 'CMS_CONTENT',
    component: dynamic(() => import('./CmsContent')),
  },
  {
    uiId: 'RETURN',
    component: dynamic(() => import('./Returns')),
  },
  {
    uiId: 'CUSTOM_FORM',
    component: dynamic(() => import('./CustomForm')),
  },
  {
    uiId: 'FINANCE_CONTENT',
    component: dynamic(() => import('./Finance')),
  },
];
