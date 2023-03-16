import '@etc/ui/ui-injecter';
import '@main/ui-storefront/src/style/sass/index.scss';

import {
  bootstrap,
  injectNextjsRouter,
} from '@main/packages-web-storefront/src';
import { useIsMobile } from '@web/base/dist/hook/isMobile';
import { resetLogRender } from '@web/base/dist/lib/logger/resetLogRender';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { useMemo } from 'react';

// Boostrap Application
bootstrap();

export default function StorefrontApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  const router = useRouter();

  useMemo(() => {
    injectNextjsRouter(router, Router);
  }, [router]);

  const { isMobile } = useIsMobile();

  if (isMobile === true) {
    return <>bản xem trước chỉ dành cho desktop</>;
  }

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
}
