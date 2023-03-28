import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { format } from '@web/base';
import { isSSR } from '@web/base/dist/util/isSSR';
import { Registry } from 'chitility';
import { DataObject } from 'chitility/dist/lib/extension/data-object';
import { ExtensionPoint } from 'chitility/dist/lib/extension/extension-point';
import { isDevelopment } from 'chitility/dist/util/environment';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import replace from 'lodash/replace';
import { useEffect, useRef, useState } from 'react';

import { WEB_STOREFRONT_KEY } from '../../../etc/key';
import { useDomainContext } from '../../domain/context/domain';
import { resolveChiakiPageResolver } from '../util/resolveChiakiPageResolver';

export const resolveStaticLayout = (pathname?: string) => {
  const pathWithOutPrefix = replace(pathname ?? '', '.html', '');

  const objectLayout = new DataObject({
    pathname: pathWithOutPrefix,
    extConfig: undefined,
  });

  const dataFromExtensionPoint = ExtensionPoint.extend(
    'resolveStaticLayout',
    objectLayout
  ).getData('extConfig');

  if (isDevelopment() && isSSR() && dataFromExtensionPoint) {
    if (isDevelopment() && isSSR()) {
      console.debug(
        format.context('resolveStaticLayout'),
        'Found static layout for pathname:',
        pathname
      );
    }
  }

  return dataFromExtensionPoint;
};

export const useResolveUnknownRouter = (fromServer: any, urlKey: string) => {
  // if (isDevelopment() && isSSR()) {
  //   console.debug(
  //     format.context('useResolveUnknownRouter'),
  //     'Resolving pathname:',
  //     urlKey
  //   );
  // }

  const domainContextValue = useDomainContext();

  // const { data, refetch } = useResolveChiakiPageQuery({
  //   fetchPolicy: FetchPolicyResolve.DEFAULT,
  //   nextFetchPolicy: FetchPolicyResolve.DEFAULT,
  //   variables: {
  //     // @ts-ignore
  //     urlKey,
  //     userId: domainContextValue.domainData.shopOwnerId,
  //   },
  // });

  // Khong duoc su dung apollo vi cac project khac su dung apollo rieng, gay conflict
  const { data, refetch } = Registry.getInstance().registry(
    WEB_STOREFRONT_KEY.URL_REWRITE_RESOLVE_QUERY
  )({
    fetchPolicy: FetchPolicyResolve.DEFAULT,
    nextFetchPolicy: FetchPolicyResolve.DEFAULT,
    variables: {
      // @ts-ignore
      urlKey,
      userId: domainContextValue.domainData.shopOwnerId,
    },
  });

  const [resolvedUrlData, setResolvedUrlData] = useState<any>(
    fromServer ??
      resolveStaticLayout(urlKey) ??
      (data?.chiakiPageResolver
        ? resolveChiakiPageResolver({ data }, urlKey)
        : {
            isResolved: false,
          })
  );

  const doQueryDbRef = useRef(
    debounce((urlKey) => {
      // Khi thực hiện chuyển page trên client cũng cần phải resolve static trước
      const staticData = resolveStaticLayout(urlKey);
      if (staticData) {
        setResolvedUrlData(staticData);
      } else {
        refetch({
          urlKey: isEmpty(urlKey) ? 'index' : urlKey,
          userId: domainContextValue.domainData.shopOwnerId,
        });
      }
    }, 77)
  );

  useEffect(() => {
    if (data && urlKey !== resolvedUrlData?.requestedPathname) {
      console.info(format.important('set new url-rewrite data'));
      setResolvedUrlData(
        resolveChiakiPageResolver(
          {
            data,
          },
          urlKey
        )
      );
    }
  }, [data, urlKey, resolvedUrlData]);

  /**
   * query database
   * Nếu trong context value chưa có giá trị thì chứng tỏ là kiểu CSR
   * Lúc đó sẽ thức hiện lazy query
   * Ở đây đơn giản hoá điều kiện chỉ cần check xem pathname đã resolve trong context với urlKey hiện tại
   */
  useEffect(() => {
    if (urlKey !== resolvedUrlData?.requestedPathname) {
      console.debug(format.important('refetch url-rewrite data'));
      setResolvedUrlData({
        isResolved: false,
      });
      doQueryDbRef.current(urlKey);
    }
  }, [urlKey]);

  return {
    urlRewriteData: resolvedUrlData,
    setUrlRewriteData: setResolvedUrlData,
  };
};
