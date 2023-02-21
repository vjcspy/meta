import { resetLogRender } from '@web/base/src/lib/logger/resetLogRender';
import type { AppProps } from 'next/app';

export default function StorefrontApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  return <Component {...pageProps} />;
}
