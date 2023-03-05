import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';

import DefaultRoot from './default.root';

export const ROOT_EXTENSION_CONFIG: () => ExtensionConfig[] = () => [
  {
    uiId: 'DEFAULT_ROOT',
    title: 'default root',
    type: ExtensionType.ROOT,
    component: DefaultRoot,
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
    priority: 100,
  },
];
