import { format } from '@web/base';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { absoluteUrl } from '@web/base/dist/util/absoluteUrl';
import { isSSR } from '@web/base/dist/util/isSSR';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import { isDevelopment } from 'chitility/dist/util/environment';
import { Registry } from 'chitility/dist/util/registry';
import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DomainContextProvider } from '../context/domain';
import { WEB_DOMAIN_KEY } from '../etc/WebDomainKey';
import { DomainPersistent } from '../util/domain-persistent';
import { DomainManager } from '../util/DomainManager';

export function withDomain(PageComponent: any, webUiAdapterOptions?: any): any {
  const WithDomain = React.memo((props: any) => {
    useDebugRender('WithDomain');
    const [domainData, setDomainData] = useState<any>(
      props.domainData ?? undefined
    );

    const _resolveDomainDataInCsr = useCallback(async () => {
      if (!domainData) {
        // cache first
        const _cachedDomainData = await DomainPersistent.getItem(
          WEB_DOMAIN_KEY.DOMAIN_DATA
        );
        if (_cachedDomainData) {
          setDomainData(_cachedDomainData);
        } else {
          DomainManager.getInstance()
            .resolveDomainData(absoluteUrl().host)
            .then((d: any) => {
              DomainPersistent.saveItem(WEB_DOMAIN_KEY.DOMAIN_DATA, d);
              setDomainData(d);
            });
        }
      }
    }, [domainData]);

    useEffect(() => {
      _resolveDomainDataInCsr().then().catch();
    }, []);

    const domainContextValue = useMemo(
      () => ({ domainData, setDomainData }),
      [domainData]
    );

    return (
      domainData && (
        <DomainContextProvider value={domainContextValue}>
          <PageComponent {...props} />
        </DomainContextProvider>
      )
    );
  });

  const getDomainDataSSrFn = async (ctx: any) => {
    if (!isSSR()) return {};

    console.info(format.processSSR('WebDomain'));
    const { host } = absoluteUrl(ctx.req);
    const domainData = await DomainManager.getInstance().resolveDomainData(
      host
    );
    Registry.getInstance().register(WEB_DOMAIN_KEY.DOMAIN_DATA, domainData);

    return {
      domainData,
    };
  };

  wrapSSRFn(
    PageComponent,
    WithDomain,
    getDomainDataSSrFn,
    undefined,
    webUiAdapterOptions?.ssr
  );

  if (isDevelopment()) {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'PageComponent';
    WithDomain.displayName = `withDomain(${displayName})`;
  }

  return WithDomain;
}
