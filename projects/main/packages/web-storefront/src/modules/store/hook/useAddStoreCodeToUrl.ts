import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';

export const useAddStoreCodeToUrl = (
  resolvedUrlData?: {
    pathname?: string;
    urlHasStoreCode?: boolean;
    currentStore?: any;
  },
  includeStoreCode = true
) => {
  // việc set lại pathname chỉ xảy ra trên client
  useEffect(() => {
    if (
      typeof resolvedUrlData?.pathname === 'string' &&
      !resolvedUrlData.urlHasStoreCode &&
      includeStoreCode
    ) {
      const query = { ...RouterSingleton.query };
      delete query['slug'];

      if (
        !isEmpty(RouterSingleton.pathname) &&
        isEmpty(resolvedUrlData.pathname)
      ) {
        // Check trong trường hợp không phải là slug
        return;
      }
      RouterSingleton.push({
        pathname:
          resolvedUrlData.currentStore['code'] + '/' + resolvedUrlData.pathname,
        query,
      });
    }
  }, [resolvedUrlData]);
};
