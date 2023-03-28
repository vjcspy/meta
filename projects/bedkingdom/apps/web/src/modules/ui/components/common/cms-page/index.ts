import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const PCMS_PAGE_EXTENSION_CONFIG: ExtensionConfig[] = [
  {
    uiId: 'PCMS_PAGE_OR_DEFAULT',
    title: 'PCMS_PAGE_OR_DEFAULT',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./pcms-page-or-default')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
  {
    uiId: 'PCMS_PAGE',
    title: 'PCMS_PAGE_OR_DEFAULT',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./pcms-page-or-default')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
];
