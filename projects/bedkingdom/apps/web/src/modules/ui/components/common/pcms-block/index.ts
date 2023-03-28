import {
  ExtensionConfig,
  ExtensionCustomizeType,
  ExtensionType,
} from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const PCMS_BLOCK_EXTENSION_CONFIG: ExtensionConfig[] = [
  {
    uiId: 'PCMS_BLOCK',
    title: 'PCMS_BLOCK',
    type: ExtensionType.COMPONENT,
    component: dynamic(() => import('./pcms-block')),
    customizeType: ExtensionCustomizeType.HOOK,
  },
];
