import { isSSR } from '@web/base/dist/util/isSSR';
import { combineHOC } from '@web/ui-extension';
import Head from 'next/head';
import React from 'react';

if (!isSSR()) {
  window?.addEventListener('load', () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href =
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css';
    link.integrity =
      'sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg==';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    document.head.appendChild(link);
  });
}

const DefaultHeader: React.FC = combineHOC()(() => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://api.bluestone.systems" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="https://www.bedkingdom.co.uk/media/favicon/websites/2/favicon.ico"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://www.bedkingdom.co.uk/media/favicon/websites/2/favicon.ico"
        />
        <meta
          httpEquiv="origin-trial"
          content="A3RXR0VQaEp/AfxPFnBULSgoOVp60FcUKXSswIgHKTXJHt6JnS4juFg8/7tWVoqWOyx77v0ujwGgxRpU8jEgnAAAAABveyJvcmlnaW4iOiJodHRwczovL3MucGluaW1nLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjQzMTU1MTk5LCJpc1RoaXJkUGFydHkiOnRydWV9"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        {/*<meta name="robots" content=""/>*/}
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta charSet="utf-8" />
        <meta name="msvalidate.01" content="08974E26450BC53A6CB4592AF1492594" />
        <meta
          name="google-site-verification"
          content="7kSxWyu3rFuA77d0TNlxk6Mj204a9iYib__xmE5sf_I"
        />
        <meta
          name="pinterest-site-verification"
          content="7f2838282f6f8058b547818d5c19d57d"
        />
        <meta
          name="p:domain_verify"
          content="7f2838282f6f8058b547818d5c19d57d"
        />
        <meta name="format-detection" content="telephone=no" />
        <meta name="format-detection" content="telephone=no" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        />
        <meta
          httpEquiv="origin-trial"
          content="A3RXR0VQaEp/AfxPFnBULSgoOVp60FcUKXSswIgHKTXJHt6JnS4juFg8/7tWVoqWOyx77v0ujwGgxRpU8jEgnAAAAABveyJvcmlnaW4iOiJodHRwczovL3MucGluaW1nLmNvbTo0NDMiLCJmZWF0dXJlIjoiQ29udmVyc2lvbk1lYXN1cmVtZW50IiwiZXhwaXJ5IjoxNjQzMTU1MTk5LCJpc1RoaXJkUGFydHkiOnRydWV9"
        />
      </Head>
    </>
  );
});

export default DefaultHeader;
