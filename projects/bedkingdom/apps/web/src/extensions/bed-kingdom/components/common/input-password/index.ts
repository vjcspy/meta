import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';
import DefaultInput from "@extensions/bed-kingdom/components/common/input-password/DefaultInput";
import DefaultPasswords from "@extensions/bed-kingdom/components/common/input-password/DefaultPasswords";

export const BED_MUI_INPUT_CPT_CFG: ExtensionConfig[] = [
  {
    uiId: 'MATERIAL_PASSWORD_STRENGTH',
    component: dynamic(() => import('./DefaultPassword')),
  },
  {
    uiId: 'MATERIAL_INPUT',
    component: DefaultInput,
  },
  {
    uiId: 'MATERIAL_PASSWORD',
    component: DefaultPasswords,
  },
];
