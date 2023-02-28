import {
  bootstrap,
  injectNextjsRouter,
} from '@main/packages-web-storefront/src';
import { resetLogRender } from '@web/base/dist/lib/logger/resetLogRender';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import { useMemo } from 'react';

bootstrap();
export default function StorefrontApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  const router = useRouter();

  useMemo(() => {
    injectNextjsRouter(router, Router);
  }, [router]);

  return <Component {...pageProps} />;
}
