import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { useCallback } from 'react';

import { useStoreContext } from '../context/store';
import webStoreExtensionValue from '../etc/web-store-extension-value';

export const useRouterWithStoreActions = (
  isIncludeStoreCode = webStoreExtensionValue.r('INCLUDE_STORE_CODE_IN_URL')
) => {
  const storeContextValue = useStoreContext();
  /*
   * Lưu ý không clear dữ liệu trong urlRewriteContext bởi vì có trường hợp update url nhưng lại không thay đổi base
   * Do đó dữ liệu trả về của graphql query không thay đổi nên không update
   */

  const go = useCallback(
    async (url: URL | string) => {
      if (isIncludeStoreCode) {
        await RouterSingleton.push(
          `${storeContextValue.storeData?.store['code']}\\${url}`,
          {
            shallow: false,
          }
        );
      } else {
        await RouterSingleton.push(url, {
          shallow: true,
        });
      }
    },
    [storeContextValue.storeData?.storeId]
  );

  const back = useCallback(async () => {
    RouterSingleton.back();
  }, []);
  return {
    actions: {
      go,
      back,
    },
  };
};
