import { useBrandListContainer } from '@extensions/bed-kingdom/hook/brand/useBrandListContainer';
import { createUiHOC } from '@web/ui-extension';

export const withBrandListContainer = createUiHOC(
  () => useBrandListContainer(),
  'withBrandListContainer'
);
