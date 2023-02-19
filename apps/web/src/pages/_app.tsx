import type { AppProps } from "next/app";
import { resetLogRender } from "web-base/src/lib/logger/resetLogRender";

export default function MyApp({ Component, pageProps }: AppProps) {
  resetLogRender();
  return <Component {...pageProps} />;
}
