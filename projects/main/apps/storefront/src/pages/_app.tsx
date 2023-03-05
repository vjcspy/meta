import '@etc/ui/ui-injecter';

import {
  bootstrap,
  injectNextjsRouter,
} from '@main/packages-web-storefront/src';
import { resetLogRender } from '@web/base/dist/lib/logger/resetLogRender';
import { isDevelopment } from 'chitility/dist/util/environment';
import type { AppProps } from 'next/app';
import getConfig from 'next/config';
import Router, { useRouter } from 'next/router';
import React from 'react';
import { useMemo } from 'react';
bootstrap();

const { publicRuntimeConfig } = getConfig();
export default function StorefrontApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  const router = useRouter();

  useMemo(() => {
    injectNextjsRouter(router, Router);
  }, [router]);

  if (publicRuntimeConfig?.nextVersion == 12 && isDevelopment()) {
    return (
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    );
  } else {
    return <Component {...pageProps} />;
  }
}
