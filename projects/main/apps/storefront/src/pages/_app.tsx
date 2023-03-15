import '@etc/ui/ui-injecter';
import '@main/ui-storefront/src/style/sass/index.scss';

import {
  bootstrap,
  injectNextjsRouter,
} from '@main/packages-web-storefront/src';
import { resetLogRender } from '@web/base/dist/lib/logger/resetLogRender';
import { isDevelopment } from 'chitility/dist/util/environment';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { useMemo } from 'react';

// Boostrap Application
bootstrap();

const { publicRuntimeConfig } = getConfig();
export default function StorefrontApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  const router = useRouter();

  useMemo(() => {
    injectNextjsRouter(router, Router);
  }, [router]);

  const AppPage = useMemo(() => {
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <meta
            name="description"
            content="Storefront Demo site Storefront Demo site"
          />
          <link
            rel="shortcut icon"
            type="image/png"
            sizes="32x32"
            href="/icons8_fav_32×32.png"
          />
          <title>Storefront Demo site</title>
        </Head>
        <Component {...pageProps} />
      </>
    );
  }, [pageProps]);

  if (publicRuntimeConfig?.nextVersion == 12 && isDevelopment()) {
    return <React.StrictMode>{AppPage}</React.StrictMode>;
  } else {
    return <>{AppPage}</>;
  }
}
