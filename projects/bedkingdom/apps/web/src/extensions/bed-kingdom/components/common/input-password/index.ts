import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const BED_MUI_INPUT_CPT_CFG: ExtensionConfig[] = [
  {
    uiId: 'MATERIAL_PASSWORD_STRENGTH',
    component: dynamic(() => import('./DefaultPassword')),
  },
];
