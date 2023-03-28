import { withBedKingdomGetConfigData } from '@extensions/bed-kingdom/hoc/common/withBedKingdomGetConfigData';
import { withBedKingdomCategoryData } from '@extensions/bed-kingdom/hoc/products/withBedKingdomCategoryData';
import { descriptionInfoCheckShowMore } from '@modules/catalog/util/descriptionInfoCheckShowMore';
import COMMON from '@values/extendable/COMMON';
import { combineHOC, UiExtension } from '@web/ui-extension';
import parse from 'html-react-parser';
import unescape from 'lodash/unescape';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React, { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const CategoryInfo = combineHOC(
  withBedKingdomCategoryData,
  withBedKingdomGetConfigData
)((props) => {
  const [readMore, setReadMore] = useState(false);
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const { asPath } = useRouter();

  const checkContent = useMemo(() => {
    return descriptionInfoCheckShowMore(props?.category?.description, isMobile);
  }, [props?.category?.description, isMobile]);

  if (typeof props?.category?.description === 'undefined') {
    return <UiExtension uiId="INFINITE_SCROLL_LOADING" />;
  }

  if (typeof props?.category?.name === 'undefined') {
    return null;
  }
  return (
    <>
      <Head>
        <title>{props?.category?.meta_title ?? props?.category?.name}</title>
        <meta
          name="title"
          content={
            props?.category?.meta_title ??
            props?.category?.name ??
            props?.state?.storeConfigData?.default_title ??
            ''
          }
          key="title"
        />
        <meta
          name="keywords"
          content={
            props?.category?.meta_keyword ??
            props?.state?.storeConfigData?.default_keywords ??
            ''
          }
          key="keywords"
        />
        <meta
          name="description"
          content={
            props?.category?.meta_description ??
            props?.state?.storeConfigData?.default_description
          }
          key="description"
        />
        <meta charSet="utf-8" key="charSet" />
      </Head>
      <NextDefaultSeo
        title={props?.category?.meta_title ?? props?.category?.name}
        titleTemplate={props?.category?.meta_title ?? props?.category?.name}
        canonical={COMMON.r('BASE_URL') + asPath.replace('/', '') ?? ''}
        openGraph={{
          title: props?.category?.meta_title ?? props?.category?.name,
          description:
            props?.category?.meta_description ??
            props?.state?.storeConfigData?.default_description,
          type: 'category',
          locale: 'en_GB',
          site_name: props?.category?.name ?? '',
          url: COMMON.r('BASE_URL') + asPath.replace('/', '') ?? '',
        }}
      />
      <section className="b-content__listing container mx-auto md:px-4">
        <div className="b-category-info">
          <div className="b-category-description">
            <div className="flex justify-between">
              <div className="col-des col-des">
                <div className={`b-category-view ${readMore && 'active'}`}>
                  <h3 className="b-category-name">{props?.category?.name}</h3>
                  <div id="cty-description" className="b-category-wrap">
                    <div className="b-category-des">
                      {checkContent ? (
                        <>
                          {readMore ? (
                            <UiExtension
                              uiId="HTML_PARSE"
                              html={props?.category?.description}
                            />
                          ) : (
                            <>
                              {parse(
                                unescape(
                                  props?.category?.description.substring(0, 900)
                                )
                              )}
                            </>
                          )}
                        </>
                      ) : (
                        <UiExtension
                          uiId="HTML_PARSE"
                          html={props?.category?.description}
                        />
                      )}
                    </div>
                  </div>
                  {checkContent && (
                    <span className="read-description">
                      <span className="showDescription pt-2 pb-2 pr-3 pl-3 flex text-14px shadow-200 text-color-222 max-w-125 cursor-pointer bg-main-FAFAFA">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="exclamation-circle"
                          className="svg-inline--fa fa-exclamation-circle fa-w-16"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
                          />
                        </svg>
                        <span
                          onClick={() => {
                            setReadMore(!readMore);
                          }}
                        >
                          {readMore ? 'Read Less' : 'Read More'}
                        </span>
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default CategoryInfo;
