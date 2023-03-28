import { bedResolvedAmastyPage } from '@extensions/bed-kingdom/store/content/content.content.actions';
import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useDispatch } from '@main/packages-web-redux';
import { useUrlRewriteContext } from '@main/packages-web-storefront/src/modules/url-rewrite/context/url-rewrite';
import { useGetAmastyPageQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { Registry } from 'chitility';
import { useEffect, useMemo } from 'react';

export const withAmastyPageContainer = createUiHOC(() => {
  const dispath = useDispatch();
  const urlRewriteContextValue = useUrlRewriteContext();

  const { data, loading } = useGetAmastyPageQuery({
    fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    // nextFetchPolicy: 'cache-first',
    // fetchPolicy: FetchPolicyResolve.NO_CACHE,
    variables: {
      pageId: urlRewriteContextValue?.urlRewriteData?.id,
    },
  });

  useMemo(() => {
    Registry.getInstance().register('CATALOG_CATEGORY_ADDITION_FILTERS', [
      {
        code: 'landing_page_id',
        data: {
          eq: urlRewriteContextValue.urlRewriteData?.id,
        },
      },
    ]);
    return {};
  }, []);

  useEffect(() => {
    if (data?.amlanding?.page_id) {
      dispath(
        bedResolvedAmastyPage({
          amastyPage: data.amlanding,
        })
      );
    }
  }, [data?.amlanding]);

  return {
    state: {
      amastyPage: data?.amlanding,
      loading,
    },
  };
}, 'withAmastyPage');
