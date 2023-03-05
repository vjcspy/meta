import type { ExtensionConfig } from '@web/ui-extension';
import { ExtensionCustomizeType, ExtensionType } from '@web/ui-extension';

import StackComponent from './stack.component';

export const STACK_EXTENSION_CONFIG: () => ExtensionConfig[] = () => [
  {
    uiId: 'STACK',
    title: 'stack',
    type: ExtensionType.COMPONENT,
    component: StackComponent,
    customizeType: ExtensionCustomizeType.HOOK,
  },
];
