import { withBedKingdomGetConfigData } from '@extensions/bed-kingdom/hoc/common/withBedKingdomGetConfigData';
import COMMON from '@values/extendable/COMMON';
import { combineHOC } from '@web/ui-extension';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React from 'react';

const DefaultMeta = combineHOC(withBedKingdomGetConfigData)(
  React.memo((props) => {
    return (
      <>
        {props?.state?.storeConfigData && (
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
            title="Bed Kingdom - UK Bed Store | Best Deals - Free Delivery"
            titleTemplate="Bed Kingdom - UK Bed Store | Best Deals - Free Delivery"
            defaultTitle="Bed Kingdom - UK Bed Store | Best Deals - Free Delivery"
            description="Bed Kingdom the UK's Bed Store, offering the widest range from our bed shop of adult & children's beds to suit any budget. Order now for best deals and free delivery."
            canonical=""
            openGraph={{
              title: 'Bed Kingdom - UK Bed Store | Best Deals - Free Delivery',
              description:
                "Bed Kingdom the UK's Bed Store, offering the widest range from our bed shop of adult & children's beds to suit any budget. Order now for best deals and free delivery.",
              type: 'website',
              locale: 'en_GB',
              site_name: props?.state?.storeConfigData?.default_title || '',
              url: COMMON.r('BASE_URL'),
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
        )}
      </>
    );
  })
);

DefaultMeta.displayName = 'DEFAULT_ROOT';

export default DefaultMeta;
