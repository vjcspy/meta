import { useProductReviews } from '@modules/catalog/hook/product/useProductReviews';
import { createUiHOC } from '@web/ui-extension';

export const withProductReview = createUiHOC(() => {
  return useProductReviews();
}, 'withProductReview');
