import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKING_STACK_EXTENSION_CONFIG: ExtensionConfig[] = [
  {
    uiId: 'FOOTER_MOBILE_STACK',
    title: 'stack',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./footerMobileStack.component')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
  {
    uiId: 'FOOTER_DESKTOP_STACK',
    title: 'stack',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./footerDesktopStack.component')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
];
