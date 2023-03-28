import { useProductRewriteUrl } from '@modules/catalog/hook/category/useProductRewriteUrl';
import { createUiHOC } from '@web/ui-extension';

export const withProductRewriteUrl = createUiHOC((props) => {
  return useProductRewriteUrl(props);
}, 'withProductRewriteUrl');
