import { useBedKingdomProductsContainer } from '@extensions/bed-kingdom/hook/products/useBedKingdomProductsContainer';
import { useBedKingdomProductsQuery } from '@extensions/bed-kingdom/hook/products/useBedKingdomProductsQuery';
import { createUiHOC } from '@web/ui-extension';

export const withBedKingdomProductsContainer = createUiHOC(() => {
  // @ts-ignore
  return useBedKingdomProductsContainer(useBedKingdomProductsQuery);
}, 'withWebProductsContainer');
