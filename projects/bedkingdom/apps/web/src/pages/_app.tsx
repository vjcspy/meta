import '@assets/styles/main.scss';
import '@extensions/bed-kingdom/assets/styles/main.scss';
import 'animate.css/animate.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { injectNextjsRouter } from '@main/packages-web-storefront/src';
import { bootstrap } from '@modules/bootstrap';
import { resetLogRender } from '@web/base/dist/lib/logger/resetLogRender';
import { UiExtension } from '@web/ui-extension';
import type { AppProps } from 'next/app';
import Router, { useRouter } from 'next/router';
import NextNprogress from 'nextjs-progressbar';
import React, { useMemo } from 'react';

bootstrap();

function MyApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  const router = useRouter();

  useMemo(() => {
    injectNextjsRouter(router, Router);
  }, [router]);

  return (
    <>
      <NextNprogress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      {/*<UiExtension uiId="DEFAULT_SEO" />*/}
      <UiExtension uiId="DEFAULT_HEADER" />
      <Component {...pageProps} />
    </>
  );
}

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   console.log(metric);
// }

export default MyApp;
