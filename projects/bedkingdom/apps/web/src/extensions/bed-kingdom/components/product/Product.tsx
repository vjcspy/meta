import { withBedkingdomProductContainer } from '@extensions/bed-kingdom/hoc/product/withBedkingdomProductContainer';
import COMMON from '@values/extendable/COMMON';
import { withInitProductInfo } from '@vjcspy/r/build/modules/catalog/hoc/category/withInitProductInfo';
import {
  combineHOC,
  UiExtension,
  useExtensionForHook,
} from '@web/ui-extension';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React, { useEffect, useMemo } from 'react';

const Product = combineHOC(
  withBedkingdomProductContainer,
  withInitProductInfo
)((props) => {
  const { asPath } = useRouter();
  const ColumnOne = useExtensionForHook('columnOne', props);
  const ColumnTwo = useExtensionForHook('columnTwo', props);

  const imgUrl = useMemo(() => {
    let img: any = '';
    // @ts-ignore
    if (
      // @ts-ignore
      Array.isArray(props?.product?.bed_data?.bed_product_image) &&
      // @ts-ignore
      props?.product?.bed_data?.bed_product_image.length
    ) {
      // @ts-ignore
      img = props?.product?.bed_data?.bed_product_image[0]?.url;
    }

    return img ?? '';
  }, [props?.product]);

  useEffect(() => {
    let metaPriceProduct: any = null;
    if (props?.product?.price_range?.minimum_price?.regular_price?.value) {
      metaPriceProduct = document.createElement('meta');
      metaPriceProduct.setAttribute('property', 'product:price:amount');
      metaPriceProduct.content =
        props?.product?.price_range?.minimum_price?.regular_price?.value;

      document.head.appendChild(metaPriceProduct);
    }

    let metaCurrencyProduct: any = null;
    if (props?.product?.price_range?.minimum_price?.regular_price?.currency) {
      metaCurrencyProduct = document.createElement('meta');
      metaCurrencyProduct.setAttribute('property', 'product:price:currency');
      metaCurrencyProduct.content =
        props?.product?.price_range?.minimum_price?.regular_price?.currency;

      document.head.appendChild(metaCurrencyProduct);
    }

    return () => {
      if (metaPriceProduct) {
        document.head.removeChild(metaPriceProduct);
      }
      if (metaCurrencyProduct) {
        document.head.removeChild(metaCurrencyProduct);
      }
    };
    // @ts-ignore
  }, [props?.product]);

  return (
    <>
      {!props?.product && (
        <UiExtension uiId="LOADING_INDICATOR" global={true} />
      )}
      <Head>
        <meta
          name="title"
          content={
            // @ts-ignore
            props?.product?.meta_title ?? props?.product?.name ?? ''
          }
          // key="title"
        />
        <meta
          name="keywords"
          content={
            // @ts-ignore
            props?.product?.meta_keyword ?? props?.product?.name ?? ''
          }
          key="keywords"
        />
        <meta
          name="description"
          content={
            // @ts-ignore
            props?.product?.meta_description ?? props?.product?.name
          }
          key="description"
        />
        <meta
          property="product:price:amount"
          // @ts-ignore
          content={
            props?.product?.price_range?.minimum_price?.regular_price?.value ??
            ''
          }
        />
        <meta
          property="product:price:currency"
          // @ts-ignore
          content={
            props?.product?.price_range?.minimum_price?.regular_price
              ?.currency ?? ''
          }
        />
        <meta charSet="utf-8" />
        <title>
          {
            // @ts-ignore
            props?.product?.meta_title ?? props?.product?.name
          }
        </title>
      </Head>
      <NextDefaultSeo
        title={
          // @ts-ignore
          props?.product?.meta_title ?? props?.product?.name
        }
        titleTemplate={
          // @ts-ignore
          props?.product?.meta_title ?? props?.product?.name
        }
        canonical={COMMON.r('BASE_URL') + asPath.replace('/', '') ?? ''}
        openGraph={{
          // @ts-ignore
          title: props?.product?.meta_title ?? props?.product?.name,
          description:
            // @ts-ignore
            props?.product?.meta_description ?? props?.product?.description,
          type: 'product',
          locale: 'en_GB',
          site_name: props?.product?.name ?? '',
          images: [
            {
              url: imgUrl ?? '',
            },
          ],
          url: COMMON.r('BASE_URL') + asPath.replace('/', '') ?? '',
        }}
      />
      <section className="b-content__details container mx-auto md:px-4">
        <div className="b-product__wrap">
          <div className="b-product-left">{ColumnOne}</div>
          <div className="b-product-right">{ColumnTwo}</div>
        </div>
      </section>
    </>
  );
});

export default Product;
