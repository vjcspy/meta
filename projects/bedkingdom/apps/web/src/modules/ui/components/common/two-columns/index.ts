import {
  ExtensionConfig,
  ExtensionCustomizeType,
  ExtensionType,
} from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const TWO_COLUMNS_EXTENSION_CONFIG: ExtensionConfig[] = [
  {
    uiId: 'TWO_COLUMNS',
    title: 'Two columns',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./two-columns')),
    customizeType: ExtensionCustomizeType.HOOK,
    structure: [
      {
        title: 'column one',
        hookId: 'columnOne',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.HEAD_COMPONENT,
      },
      {
        title: 'column two',
        hookId: 'columnTwo',
        uiId: 'STACK',
        customizeType: ExtensionCustomizeType.CAN_PUSH_REMOVE,
        childrenType: ExtensionType.COMPONENT,
      },
    ],
  },
];
