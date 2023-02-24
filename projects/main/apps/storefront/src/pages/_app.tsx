import { resetLogRender } from '@web/base/dist/lib/logger/resetLogRender';
import type { AppProps } from 'next/app';

export default function StorefrontApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  return <Component {...pageProps} />;
}
