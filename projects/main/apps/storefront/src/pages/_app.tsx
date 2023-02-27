import { bootstrap } from '@main/packages-web-storefront/src/util/bootstrap';
import { resetLogRender } from '@web/base/dist/lib/logger/resetLogRender';
import type { AppProps } from 'next/app';

bootstrap();
export default function StorefrontApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  return <Component {...pageProps} />;
}
