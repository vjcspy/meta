import { combineHOC } from '@web/ui-extension';
import Head from 'next/head';
import React from 'react';

const DefaultHeader: React.FC = combineHOC()((props) => {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://api.bluestone.systems" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      </Head>
    </>
  );
});

export default DefaultHeader;
