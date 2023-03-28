import { useProductRatingMetadata } from '@modules/catalog/hook/product/useProductRatingMetadata';
import { createUiHOC } from '@web/ui-extension';

export const withProductRatingMetadata = createUiHOC(() => {
  return useProductRatingMetadata();
}, 'withProductRatingMetadata');
