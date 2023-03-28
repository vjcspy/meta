import { useGetBedkingdomProductDetailByUrlKeyQuery } from '@vjcspy/apollo-bed-kingdom';
import { useProductData } from '@vjcspy/r/build/modules/catalog/hook/product/useProductData';
import { createUiHOC } from '@web/ui-extension';

export const withBedkingdomProductContainer = createUiHOC(
  // @ts-ignore
  () => useProductData(useGetBedkingdomProductDetailByUrlKeyQuery),
  'withBedkingdomProductContainer'
);
