import { withAmastyPageState } from '@extensions/bed-kingdom/hoc/amasty-page/withAmastyPageState';
import { descriptionInfoCheckShowMore } from '@modules/catalog/util/descriptionInfoCheckShowMore';
import COMMON from '@values/extendable/COMMON';
import { combineHOC, UiExtension } from '@web/ui-extension';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React, { useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const AmastyLandingPageInfo = combineHOC(withAmastyPageState)((props) => {
  const { asPath } = useRouter();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const [readMore, setReadMore] = useState(false);
  const checkContent = useMemo(() => {
    return descriptionInfoCheckShowMore(
      props?.state?.amastyPage?.layout_top_description,
      isMobile
    );
  }, [props?.state?.amastyPage?.layout_top_description, isMobile]);

  const checkMeta = useMemo(() => {
    if (
      props?.state?.amastyPage?.meta_data &&
      Array.isArray(JSON.parse(props?.state?.amastyPage?.meta_data)) &&
      JSON.parse(props?.state?.amastyPage?.meta_data).length > 0
    ) {
      return JSON.parse(props?.state?.amastyPage?.meta_data)[0];
    }
    return null;
  }, [props?.state?.amastyPage?.meta_data]);

  if (typeof props?.state?.amastyPage?.layout_top_description === 'undefined') {
    return null;
  }

  return (
    <>
      <Head>
        <title>{checkMeta?.meta_title ?? ''}</title>
        <meta
          name="title"
          content={checkMeta?.meta_title ?? ''}
          // key="title"
        />
        <meta
          name="keywords"
          content={checkMeta?.meta_keyword ?? ''}
          key="keywords"
        />
        <meta
          name="description"
          content={checkMeta?.meta_description ?? ''}
          key="description"
        />
        <meta charSet="utf-8" key="charSet" />
      </Head>
      <NextDefaultSeo
        title={checkMeta?.meta_title ?? ''}
        titleTemplate={checkMeta?.meta_title ?? ''}
        description={checkMeta?.meta_description ?? ''}
        canonical={COMMON.r('BASE_URL') + asPath.replace('/', '') ?? ''}
        openGraph={{
          type: 'article',
          locale: 'en_GB',
          site_name: checkMeta?.meta_title ?? '',
          url: COMMON.r('BASE_URL') + asPath.replace('/', '') ?? '',
        }}
      />
      <section className="b-content__listing container mx-auto md:px-4">
        <div className="b-category-info">
          <div className="b-category-description">
            <div className="flex justify-between">
              <div className="col-des">
                <div className={`b-category-view ${readMore && 'active'}`}>
                  <h3 className="b-category-name">
                    {props?.state?.amastyPage?.title}
                  </h3>
                  {props?.state?.amastyPage['image'] && (
                    <div className="max-w-440">
                      <img
                        className="b-branch-image mt-2"
                        src={props?.state?.amastyPage['image']}
                        title=""
                        alt=""
                      />
                    </div>
                  )}
                  <div id="cty-description" className="b-category-wrap">
                    <div className="b-category-des">
                      <UiExtension
                        uiId="HTML_PARSE"
                        html={props?.state?.amastyPage?.layout_top_description}
                      />
                    </div>
                  </div>
                  {checkContent && (
                    <span className="read-description">
                      <span className="showDescription flex max-w-125 cursor-pointer bg-main-FAFAFA py-2 px-3 text-14px text-color-222 shadow-200">
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

export default AmastyLandingPageInfo;
