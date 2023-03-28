import { useProductReviewsActions } from '@modules/catalog/hook/product/useProductReviewsActions';
import { createUiHOC } from '@web/ui-extension';

export const withProductReviewActions = createUiHOC(() => {
  return useProductReviewsActions();
}, 'withProductReviewActions');
