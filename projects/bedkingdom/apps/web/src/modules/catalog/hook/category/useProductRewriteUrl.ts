import { retrieveProductRewriteUrl } from '@vjcspy/r/build/modules/catalog/util/retrieveProductRewriteUrl';
import { useUrlRewriteContext } from '@main/packages-web-storefront/src/modules/url-rewrite/context/url-rewrite';
import { useRouterWithStoreActions } from '@vjcspy/web-store/build/hook/router/userRouterWithStoreActions';
import { useCallback, useMemo } from 'react';

export const useProductRewriteUrl = (props: { product: any }) => {
  const urlRewriteContextValue = useUrlRewriteContext();
  const routerWithStore = useRouterWithStoreActions();
  const urlRewrite = useMemo(() => {
    if (
      props.product &&
      urlRewriteContextValue.urlRewriteData.type === 'CATEGORY' &&
      typeof urlRewriteContextValue.urlRewriteData.id === 'number'
    ) {
      return retrieveProductRewriteUrl(
        props.product,
        urlRewriteContextValue.urlRewriteData.id
      );
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
