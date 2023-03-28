import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const STACK_EXTENSION_CONFIG: ExtensionConfig[] = [
  {
    uiId: 'STACK',
    title: 'stack',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./stack.component')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
  {
    uiId: 'PERFORMANCE_TESTING_STACK',
    title: 'Performance testing stack',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./PerformanceTestingStack')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
];
