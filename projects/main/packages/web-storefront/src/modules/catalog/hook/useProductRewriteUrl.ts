import isNumber from 'lodash/isNumber';
import { useCallback, useMemo } from 'react';

import { useRouterWithStoreActions } from '../../store/hook/userRouterWithStoreActions';
import { useUrlRewriteContext } from '../../url-rewrite/context/url-rewrite';
import { resolveProductRewriteUrl } from '../util/resolveProductRewriteUrl';

export const useProductRewriteUrl = (props: { product: any }) => {
  const urlRewriteContextValue = useUrlRewriteContext();
  const routerWithStore = useRouterWithStoreActions();
  const urlRewrite = useMemo(() => {
    if (
      props.product &&
      urlRewriteContextValue.urlRewriteData.type === 'CATEGORY' &&
      isNumber(urlRewriteContextValue.urlRewriteData.id)
    ) {
      return resolveProductRewriteUrl(
        props.product,
        urlRewriteContextValue.urlRewriteData.id
      );
    } else {
      if (
        Array.isArray(props?.product?.url_rewrites) &&
        props?.product?.url_rewrites.length > 0
      ) {
        return props?.product?.url_rewrites[0]['url'];
      } else if (props?.product?.url_key && props?.product?.url_suffix) {
        return `${props.product.url_key}${props?.product?.url_suffix}`;
      }
    }

    return undefined;
  }, [props.product]);

  const goProductRewriteUrl = useCallback(() => {
    if (urlRewrite) {
      routerWithStore.actions.go(urlRewrite);
    }
  }, [urlRewrite]);

  return {
    actions: {
      goProductRewriteUrl,
    },
  };
};
