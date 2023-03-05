import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { useMemo } from 'react';

import { useDomainContext } from '../../domain/context/domain';
import { DomainManager } from '../../domain/util/DomainManager';

/**
 * Lấy ra đúng pathname kể cả nó đã bao gồm store code
 */
export const useResolveUrlWithStore = () => {
  const domainContextValue = useDomainContext();

  const urlKey = useMemo(() => {
    const query = RouterSingleton.query;
    if (query && Array.isArray(query['slug'])) {
      return query['slug'].join('/');
    }
    if (Object.keys(query).length === 0) {
      //home page
      return '';
    }

    return '';
  }, [RouterSingleton.query]);

  // Lấy ra store hiện tại dựa vào url
  const resolvedUrlData = useMemo(() => {
    if (typeof urlKey !== 'string') {
      throw new Error('Could not resolve url');
    }

    return DomainManager.getInstance().resolveUrl(
      urlKey,
      domainContextValue.domainData.defaultStore,
      domainContextValue.domainData.stores
    );
  }, [urlKey]);

  return {
    pathname: resolvedUrlData?.pathname,
    urlHasStoreCode: resolvedUrlData?.urlHasStoreCode,
    currentStore: resolvedUrlData?.currentStore,
  };
};
