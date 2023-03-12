import { createUiHOC } from '@web/ui-extension';

import { useProductRewriteUrl } from '../hook/useProductRewriteUrl';

export const withProductRewriteUrl = createUiHOC((props) => {
  return useProductRewriteUrl(props);
}, 'withProductRewriteUrl');
