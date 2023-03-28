import COMMON from '@values/extendable/COMMON';
import { combineHOC } from '@web/ui-extension';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React from 'react';

const DefaultSeo: React.FC = combineHOC()(() => {
  return (
    <>
      <NextDefaultSeo
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1 maximum-scale=1',
          },
          {
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            name: 'theme-color',
            content: '#ffffff',
          },
        ]}
        additionalLinkTags={[
          {
            rel: 'apple-touch-icon',
            href: 'icons/apple-icon-180.png',
          },
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
        ]}
        title={COMMON.r('BRAND_NAME')}
        titleTemplate={COMMON.r('BRAND_NAME')}
        defaultTitle={COMMON.r('BRAND_NAME')}
        description={COMMON.r('BRAND_NAME')}
        openGraph={{
          title: '',
          description: '',
          type: 'website',
          locale: 'en_GB',
          site_name: COMMON.r('BRAND_NAME'),
          images: [
            {
              url: '',
              width: 800,
              height: 600,
              alt: '',
            },
          ],
          // url: props?.state?.storeConfigData?.secure_base_url ?? '',
        }}
      />
    </>
  );
});

export default DefaultSeo;
