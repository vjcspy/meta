import { ExtensionConfig } from '@web/ui-extension';

import { PCMS_PAGE_EXTENSION_CONFIG } from './cms-page';
import { ONE_COLUMN_EXTENSION_CONFIG } from './one-column';
import { PCMS_BLOCK_EXTENSION_CONFIG } from './pcms-block';
import { ROOT_EXTENSION_CONFIG } from './root';
import { STACK_EXTENSION_CONFIG } from './stack';
import { TWO_COLUMNS_EXTENSION_CONFIG } from './two-columns';

export const COMMON_ROOT_EXTENSION_CONFIGS: ExtensionConfig[] = [
  ...ROOT_EXTENSION_CONFIG,
  ...STACK_EXTENSION_CONFIG,
  ...TWO_COLUMNS_EXTENSION_CONFIG,
  ...PCMS_PAGE_EXTENSION_CONFIG,
  ...PCMS_BLOCK_EXTENSION_CONFIG,
  ...ONE_COLUMN_EXTENSION_CONFIG,
];
