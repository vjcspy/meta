import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useDispatch } from '@main/packages-web-redux';
import { useUrlRewriteContext } from '@main/packages-web-storefront/src/modules/url-rewrite/context/url-rewrite';
import { gotProductData } from '@modules/catalog/store/product/product.actions';
import type { ProductDetailByUrlKeyQueryHookResult } from '@vjcspy/apollo/build';
import { getUrlKey } from '@web/base/dist/util/getUrlKey';
import { useEffect, useMemo } from 'react';

export const useProductData = (
  queryHook: (options: any) => ProductDetailByUrlKeyQueryHookResult
) => {
  const urlRewriteContextValue = useUrlRewriteContext();
  const urlKey = useMemo(() => {
    if (urlRewriteContextValue.urlRewriteData?.pathname) {
      return getUrlKey(urlRewriteContextValue.urlRewriteData?.pathname);
    }
    return null;
  }, [urlRewriteContextValue.urlRewriteData?.pathname]);

  if (!urlKey) {
    console.error('could not resolve urlKey for product detail page');
  }

  const productQuery = queryHook({
    variables: {
      urlKey,
    },
    fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    nextFetchPolicy: 'cache-first',
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      Array.isArray(productQuery.data?.products?.items) &&
      productQuery.data!.products!.items!.length > 0
    ) {
      dispatch(
        gotProductData({
          product: productQuery!.data!.products!.items[0],
        })
      );
    }

    return () => {
      dispatch(
        gotProductData({
          product: undefined,
        })
      );
    };
  }, [productQuery.data]);

  useEffect(() => {
    if (productQuery.error) {
      console.error('get product detail data error');
    }
  }, [productQuery.error]);

  return {
    product: productQuery.data?.products?.items![0],
  };
};
