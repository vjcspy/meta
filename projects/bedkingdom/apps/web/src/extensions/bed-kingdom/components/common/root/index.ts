import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BEDKING_ROOT_EXTENSION_CONFIG: ExtensionConfig[] = [
  {
    uiId: 'DEFAULT_ROOT',
    title: 'default root',
    type: ExtensionType.ROOT,
    component: dynamic(() => import('./default.root')),
    customizeType: ExtensionCustomizeType.HOOK,
    structure: [
      {
        title: 'head',
        hookId: 'head',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.HEAD_COMPONENT,
      },
      {
        title: 'header',
        hookId: 'header',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.COMPONENT,
      },
      {
        title: 'main',
        hookId: 'main',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.COMPONENT,
      },
      {
        title: 'footer',
        hookId: 'footer',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.COMPONENT,
      },
    ],
    priority: 90,
  },
  {
    uiId: 'DEFAULT_META',
    component: dynamic(() => import('./DefaultMeta')),
    priority: 10,
  },
  {
    uiId: 'DEFAULT_GOOGLE_TAG_MANAGER',
    component: dynamic(() => import('./DefaultGoogleTagManager')),
    priority: 10,
  },
];
