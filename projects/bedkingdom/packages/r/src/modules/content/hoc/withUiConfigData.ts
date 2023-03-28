import { useUiConfigData } from '@modules/content/hook/useUiConfigData';
import { createUiHOC } from '@web/ui-extension';

export const withUiConfigData = createUiHOC(
  () => useUiConfigData(),
  'withUiConfigData'
);
