import COMMON from '@extensions/bed-kingdom/values/COMMON';
import { WEB_URL_REWRITE_KEY } from '@vjcspy/r/build/modules/router/values/WEB_URL_REWRITE_KEY';
import { graphqlFetch } from '@vjcspy/r/build/util/graphql-fetch';
import { isSSR } from '@web/base/dist/util/isSSR';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import { Registry } from 'chitility';
import { CacheFile } from 'chitility/dist/util/cache-file';
import Head from 'next/head';
import { DefaultSeo as NextDefaultSeo } from 'next-seo';
import React from 'react';

export const withBedRichSnippet = (
  PageComponent: any,
  webUiAdapterOptions?: any
): any => {
  const WithBedRichSnippet = React.memo((props: any) => {
    const listScript: any = [];
    const listScriptProductPage: any = [];
    const listScriptCategoryPage: any = [];

    const urlRewriteData = Registry.getInstance().registry(
      WEB_URL_REWRITE_KEY.URL_REWRITE_DATA
    );

    if (props?.richSnippets) {
      const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
      let match: any;
      while ((match = re.exec(props?.richSnippets))) {
        if (Array.isArray(match) && match.length > 0) {
          listScript.push(match[1]);
        }
      }
    }

    if (props?.scriptProductPage) {
      const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
      let match: any;
      while ((match = re.exec(props?.scriptProductPage))) {
        if (Array.isArray(match) && match.length > 0) {
          listScriptProductPage.push(match[1]);
        }
      }
    }

    if (props?.scriptCategoryPage) {
      const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm;
      let match: any;
      while ((match = re.exec(props?.scriptCategoryPage))) {
        if (Array.isArray(match) && match.length > 0) {
          listScriptCategoryPage.push(match[1]);
        }
      }
    }
    // console.log('+++++++++++++++++++++++++++++', props);
    return (
      <>
        <PageComponent {...props} />
        {/*script snippet and head home page*/}
        {urlRewriteData?.type === 'CHIAKI_PAGE' &&
          urlRewriteData?.pathname.indexOf('brands/') !== 0 && (
            <>
              <Head>
                <meta
                  name="title"
                  content="Bed Kingdom - UK Bed Store | Best Deals - Free Delivery"
                  // key="title"
                />

                <meta
                  name="keywords"
                  content="Bunk Beds, TV Beds, Childrens Beds, Mattresses, ottoman beds"
                  // key="keywords"
                />

                <meta
                  name="description"
                  content="Bed Kingdom the UK's Bed Store, offering the widest range from our bed shop of adult & children's beds to suit any budget. Order now for best deals and free delivery."
                  // key="description"
                />
                <title>
                  Bed Kingdom - UK Bed Store | Best Deals - Free Delivery
                </title>
              </Head>
              <NextDefaultSeo
                additionalMetaTags={[
                  {
                    name: 'viewport',
                    content:
                      'width=device-width, initial-scale=1 maximum-scale=1',
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
                openGraph={{
                  title:
                    'Bed Kingdom - UK Bed Store | Best Deals - Free Delivery',
                  description:
                    "Bed Kingdom the UK's Bed Store, offering the widest range from our bed shop of adult & children's beds to suit any budget. Order now for best deals and free delivery.",
                  type: 'website',
                  locale: 'en_GB',
                  site_name: COMMON.r('BRAND_NAME'),
                  url: COMMON.r('BASE_URL').replace('/', ''),
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
              {urlRewriteData?.type === 'CHIAKI_PAGE' &&
                urlRewriteData?.pathname !== 'index' &&
                props?.storeConfigCmsPage?.title && (
                  <>
                    <Head>
                      <meta
                        name="title"
                        content={
                          props?.storeConfigCmsPage?.meta_title ??
                          props?.storeConfigCmsPage?.title
                        }
                        // key="title"
                      />

                      <meta
                        name="keywords"
                        content={props?.storeConfigCmsPage?.meta_keywords ?? ''}
                        // key="keywords"
                      />

                      <meta
                        name="description"
                        content={
                          props?.storeConfigCmsPage?.meta_description ?? ''
                        } // key="description"
                      />
                      <title>
                        {props?.storeConfigCmsPage?.meta_title ??
                          props?.storeConfigCmsPage?.title}
                      </title>
                    </Head>
                    <NextDefaultSeo
                      title={
                        props?.storeConfigCmsPage?.meta_title ??
                        props?.storeConfigCmsPage?.title
                      }
                      titleTemplate={
                        props?.storeConfigCmsPage?.meta_title ??
                        props?.storeConfigCmsPage?.title
                      }
                      defaultTitle={
                        props?.storeConfigCmsPage?.meta_title ??
                        props?.storeConfigCmsPage?.title
                      }
                      description={
                        props?.storeConfigCmsPage?.meta_description ?? ''
                      }
                      openGraph={{
                        title:
                          props?.storeConfigCmsPage?.meta_title ??
                          props?.storeConfigCmsPage?.title,
                        description:
                          props?.storeConfigCmsPage?.meta_description ?? '',
                        type: 'website',
                        locale: 'en_GB',
                        site_name: COMMON.r('BRAND_NAME'),
                        url:
                          COMMON.r('BASE_URL') +
                            props?.storeConfigCmsPage?.url_key ?? '',
                      }}
                    />
                  </>
                )}
            </>
          )}
        {urlRewriteData?.type === 'CHIAKI_PAGE' &&
          urlRewriteData?.pathname.indexOf('brands/') === 0 && (
            <>
              <Head>
                <meta
                  name="title"
                  content={props?.storeConfigBrandPage?.label ?? ''}
                  // key="title"
                />

                <meta
                  name="keywords"
                  content={props?.storeConfigBrandPage?.short_description ?? ''}
                  // key="keywords"
                />

                <meta
                  name="description"
                  content={props?.storeConfigBrandPage?.description ?? ''}
                  // key="description"
                />
                <title>{props?.storeConfigBrandPage?.label ?? ''}</title>
              </Head>
              <NextDefaultSeo
                additionalMetaTags={[
                  {
                    name: 'viewport',
                    content:
                      'width=device-width, initial-scale=1 maximum-scale=1',
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
                title={props?.storeConfigBrandPage?.label ?? ''}
                titleTemplate={props?.storeConfigBrandPage?.label ?? ''}
                defaultTitle={props?.storeConfigBrandPage?.label ?? ''}
                description={props?.storeConfigBrandPage?.description ?? ''}
                openGraph={{
                  title: props?.storeConfigBrandPage?.label,
                  description: props?.storeConfigBrandPage?.description,
                  type: 'website',
                  locale: 'en_GB',
                  site_name: COMMON.r('BRAND_NAME'),
                  url: COMMON.r('BASE_URL') + urlRewriteData?.pathname,
                }}
              />
            </>
          )}
        <Head>
          {listScript.length > 0 &&
            listScript.map((item: any) => (
              <script
                key={item}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: String(item),
                }}
              />
            ))}
        </Head>
        {/*script snippet product page*/}
        <Head>
          {listScriptProductPage &&
            listScriptProductPage.length > 0 &&
            listScriptProductPage.map((item: any) => (
              <script
                key={item}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: String(item),
                }}
              />
            ))}
        </Head>
        {urlRewriteData?.type === 'PRODUCT' && props?.scriptProductPage && (
          <>
            <Head>
              <meta
                name="title"
                content={props?.scriptProductPage?.meta_title ?? ''}
                // key="title"
              />
              <meta
                name="keywords"
                content={props?.scriptProductPage?.meta_keyword ?? ''}
                // key="keywords"
              />
              <meta
                name="description"
                content={props?.scriptProductPage?.meta_description ?? ''}
                // key="description"
              />
              <meta charSet="utf-8" key="charSet" />
              <meta
                property="product:price:amount"
                content={
                  props?.scriptProductPage?.price_range?.minimum_price
                    ?.regular_price?.value
                }
              />
              <meta
                property="product:price:currency"
                content={
                  props?.product?.price_range?.minimum_price?.regular_price
                    ?.currency
                }
              />
              <title>{props?.scriptProductPage?.meta_title}</title>
            </Head>
            <NextDefaultSeo
              additionalMetaTags={[
                {
                  name: 'viewport',
                  content:
                    'width=device-width, initial-scale=1 maximum-scale=1',
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
              title={props?.scriptProductPage?.meta_title ?? ''}
              titleTemplate={props?.scriptProductPage?.meta_title ?? ''}
              defaultTitle={props?.scriptProductPage?.meta_title ?? ''}
              description={props?.scriptProductPage?.meta_description ?? ''}
              canonical={
                COMMON.r('BASE_URL') +
                  props?.scriptProductPage?.url_path +
                  props?.scriptProductPage?.url_suffix ?? '.html'
              }
              openGraph={{
                title: props?.scriptProductPage?.name ?? '',
                description: props?.scriptProductPage?.meta_description ?? '',
                type: 'product',
                locale: 'en_GB',
                site_name: props?.scriptProductPage?.name ?? '',

                url:
                  COMMON.r('BASE_URL') +
                    props?.scriptProductPage?.url_path +
                    props?.scriptProductPage?.url_suffix ?? '.html',
              }}
            />
          </>
        )}

        {/*script snippet category page*/}
        {listScriptCategoryPage &&
          listScriptCategoryPage.length > 0 &&
          listScriptCategoryPage.map((item: any) => (
            <script
              key={item}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: String(item),
              }}
            />
          ))}

        {urlRewriteData?.type === 'CATEGORY' &&
          props?.storeConfigCategoryPage && (
            <>
              <Head>
                <meta
                  name="title"
                  content={props?.storeConfigCategoryPage?.meta_title ?? ''}
                  // key="title"
                />
                <meta
                  name="keywords"
                  content={props?.storeConfigCategoryPage?.meta_keyword ?? ''}
                  // key="keywords"
                />
                <meta
                  name="description"
                  content={
                    props?.storeConfigCategoryPage?.meta_description ?? ''
                  }
                  // key="description"
                />
                <meta charSet="utf-8" key="charSet" />
                <title>{props?.storeConfigCategoryPage?.meta_title}</title>
              </Head>
              <NextDefaultSeo
                additionalMetaTags={[
                  {
                    name: 'viewport',
                    content:
                      'width=device-width, initial-scale=1 maximum-scale=1',
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
                title={props?.storeConfigCategoryPage?.meta_title ?? ''}
                titleTemplate={props?.storeConfigCategoryPage?.meta_title ?? ''}
                defaultTitle={props?.storeConfigCategoryPage?.meta_title ?? ''}
                description={
                  props?.storeConfigCategoryPage?.meta_description ??
                  props?.storeConfigCategoryPage?.description ??
                  ''
                }
                canonical={
                  COMMON.r('BASE_URL') +
                    props?.storeConfigCategoryPage?.url_path +
                    props?.storeConfigCategoryPage?.url_suffix ?? '.html'
                }
                openGraph={{
                  title: props?.storeConfigCategoryPage?.meta_title ?? '',
                  description:
                    props?.storeConfigCategoryPage?.meta_description ?? '',
                  type: 'category',
                  locale: 'en_GB',
                  site_name: props?.storeConfigCategoryPage?.name ?? '',
                  url:
                    COMMON.r('BASE_URL') +
                      props?.storeConfigCategoryPage?.url_path +
                      props?.storeConfigCategoryPage?.url_suffix ?? '',
                }}
              />
            </>
          )}

        {urlRewriteData?.type === 'AMASTY_XLANDING_PAGE' &&
          props?.storeConfigLandingPage && (
            <>
              <Head>
                <meta
                  name="title"
                  content={props?.storeConfigLandingPage?.meta_title ?? ''}
                  // key="title"
                />
                <meta
                  name="keywords"
                  content={props?.storeConfigLandingPage?.meta_keywords ?? ''}
                  // key="keywords"
                />
                <meta
                  name="description"
                  content={
                    props?.storeConfigLandingPage?.meta_description ?? ''
                  }
                  // key="description"
                />
                <meta charSet="utf-8" key="charSet" />
                <title>{props?.storeConfigLandingPage?.meta_title}</title>
              </Head>
              <NextDefaultSeo
                additionalMetaTags={[
                  {
                    name: 'viewport',
                    content:
                      'width=device-width, initial-scale=1 maximum-scale=1',
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
                title={props?.storeConfigLandingPage?.meta_title ?? ''}
                titleTemplate={props?.storeConfigLandingPage?.meta_title ?? ''}
                defaultTitle={props?.storeConfigLandingPage?.meta_title ?? ''}
                description={
                  props?.storeConfigLandingPage?.meta_description ?? ''
                }
                canonical={COMMON.r('BASE_URL') + urlRewriteData?.pathname}
                openGraph={{
                  title: props?.storeConfigLandingPage?.meta_title ?? '',
                  description:
                    props?.storeConfigLandingPage?.meta_description ?? '',
                  type: 'category',
                  locale: 'en_GB',
                  site_name: props?.storeConfigLandingPage?.meta_title ?? '',
                  url: COMMON.r('BASE_URL') + urlRewriteData?.pathname,
                }}
              />
            </>
          )}
      </>
    );
  });

  const getRichSnippetSSrFn = async () => {
    let scriptProductPage: any = null;
    let scriptCategoryPage: any = null;
    let storeConfigCategoryPage: any = null;
    let storeConfigLandingPage: any = null;
    let storeConfigBrandPage: any = null;
    let storeConfigCmsPage: any = null;

    const { richSnippets, storeConfigData } =
      await getRichSnippetSSrFnDefaultPage();

    const urlRewriteData = Registry.getInstance().registry(
      WEB_URL_REWRITE_KEY.URL_REWRITE_DATA
    );

    if (urlRewriteData?.type === 'CATEGORY') {
      // TODO: need to fix
      if (urlRewriteData?.id) {
        const dataCategory: any = await getRichSnippetSSrFnCategoryPage(
          urlRewriteData?.id,
          urlRewriteData?.pathname
        );

        scriptCategoryPage = dataCategory?.scriptCategoryPage;
        storeConfigCategoryPage = dataCategory?.storeConfigCategoryPage;
      }
    } else if (urlRewriteData?.type === 'PRODUCT') {
      // TODO: need to fix
      if (urlRewriteData?.pathname) {
        const dataProduct = await getRichSnippetSSrFnProductPage(
          urlRewriteData?.pathname?.replace('.html', '')
        );
        scriptProductPage = dataProduct?.richSnippetsProductPage;
      }
    } else if (urlRewriteData?.type === 'AMASTY_XLANDING_PAGE') {
      if (urlRewriteData?.id) {
        const dataCategory: any = await getRichSnippetSSrFnLandingPage(
          urlRewriteData?.id,
          urlRewriteData?.pathname
        );

        scriptCategoryPage = dataCategory?.scriptCategoryPage;
        storeConfigLandingPage = dataCategory?.storeConfigLandingPage;
      }
    } else if (
      urlRewriteData?.type === 'CHIAKI_PAGE' &&
      urlRewriteData?.pathname.indexOf('brands/') === 0
    ) {
      const dataCategory: any = await getRichSnippetSSrFnBrandPage(
        urlRewriteData
      );

      scriptCategoryPage = dataCategory?.scriptCategoryPage;
      storeConfigBrandPage = dataCategory?.storeConfigBrandPage;
    } else if (
      urlRewriteData?.type === 'CHIAKI_PAGE' &&
      urlRewriteData?.pathname !== 'index'
    ) {
      let cmsContent: any = null;

      const mainData = urlRewriteData?.config_data?.extensionDataConfigs.filter(
        (item: any) => item?.forHookId === 'main'
      );
      if (
        Array.isArray(mainData) &&
        mainData.length > 0 &&
        mainData[0]?.extensionDataConfigs
      ) {
        const mainStack = mainData[0]?.extensionDataConfigs.filter(
          (item: any) => item?.uiId === 'STACK'
        );
        if (
          Array.isArray(mainStack) &&
          mainStack.length > 0 &&
          mainStack[0]?.extensionDataConfigs
        ) {
          const dataCms = mainStack[0]?.extensionDataConfigs.filter(
            (item: any) => item?.uiId === 'CMS_CONTENT'
          );
          if (
            Array.isArray(dataCms) &&
            dataCms.length > 0 &&
            dataCms[0]?.additionalData &&
            Array.isArray(dataCms[0]?.additionalData) &&
            dataCms[0]?.additionalData.length > 0 &&
            dataCms[0]?.additionalData[0]?.key === 'identifier'
          ) {
            cmsContent = dataCms[0]?.additionalData[0]?.value;
          }
        }
      }

      if (cmsContent) {
        const dataCms: any = await getRichSnippetSSrFnCmsPage(cmsContent);

        storeConfigCmsPage = dataCms?.cmsPageData;
      }
    }

    return {
      richSnippets,
      storeConfigData,
      scriptProductPage,
      scriptCategoryPage,
      storeConfigCategoryPage,
      storeConfigLandingPage,
      storeConfigBrandPage,
      storeConfigCmsPage,
    };
  };

  const getRichSnippetSSrFnCmsPage = async (cmsContent: string) => {
    const cachedRichSnippetCmsPage = await CacheFile.get(
      'getRichSnippetSSrFnCmsPage',
      'global'
    );

    if (cachedRichSnippetCmsPage) {
      console.info('[CACHED]: getRichSnippetSSrFnCmsPage');
      return cachedRichSnippetCmsPage;
    }

    const cmsPageData = (
      await graphqlFetch({
        query:
          `query {
            cmsPage(identifier: "` +
          cmsContent +
          `") {
              url_key
              title
              meta_title
              meta_keywords
              meta_description
            }
          }`,
      })
    )?.cmsPage;

    const data = {
      cmsPageData,
    };

    await CacheFile.save('getRichSnippetSSrFnCmsPage', data, 'global');

    return data;
  };

  const getRichSnippetSSrFnDefaultPage = async () => {
    const cachedRichSnippetDefaultPage = await CacheFile.get(
      'getRichSnippetSSrFnDefaultPage',
      'global'
    );

    if (cachedRichSnippetDefaultPage) {
      console.info('[CACHED]: getRichSnippetSSrFnDefaultPage');
      return cachedRichSnippetDefaultPage;
    }

    const richSnippets = (
      await graphqlFetch({
        query: `query {
        getRichSnippets
        }`,
      })
    )?.getRichSnippets;

    const storeConfigData = (
      await graphqlFetch({
        query: `    query {
        storeConfig {
          default_title
          default_description
          default_keywords
          head_includes
          secure_base_url
          locale
        }
      }`,
      })
    )?.storeConfig;

    const data = {
      richSnippets,
      storeConfigData,
    };

    await CacheFile.save('getRichSnippetSSrFnDefaultPage', data, 'global');

    return data;
  };

  const getRichSnippetSSrFnProductPage = async (urlKey: string) => {
    let richSnippetsProductPage: any = null;

    const cachedRichSnippetsProductPage = await CacheFile.get(
      'getRichSnippetSSrFnProductPage',
      'global'
    );

    if (cachedRichSnippetsProductPage) {
      console.info('[CACHED]: getRichSnippetSSrFnProductPage');
      return cachedRichSnippetsProductPage;
    }

    const dataProductItem = (
      await graphqlFetch({
        query:
          `query {
        products(filter: { url_key: { eq: "` +
          urlKey +
          `" } }){
                items {
                  name
                  meta_description
                  meta_keyword
                  meta_title
                  url_key
                  url_suffix
                  bed_data{
                      rich_snippets
                  }
                     price_range{
                          minimum_price {
                          regular_price {
                              value
                              currency
                          }
                          final_price {
                              value
                              currency
                          }
                          discount {
                              amount_off
                              percent_off
                          }
                      }
                  }
                }
            }
        }`,
      })
    )?.products;

    if (dataProductItem?.items.length > 0) {
      richSnippetsProductPage =
        dataProductItem?.items[0]?.bed_data?.rich_snippets;
    }

    await CacheFile.save(
      'getRichSnippetSSrFnProductPage',
      { richSnippetsProductPage },
      'global'
    );

    return { richSnippetsProductPage };
  };

  const getRichSnippetSSrFnLandingPage = async (
    landingPageId: string,
    path: string
  ) => {
    const cachedRichSnippetSSrFnLandingPage = await CacheFile.get(
      'getRichSnippetSSrFnLandingPage',
      'global'
    );

    if (cachedRichSnippetSSrFnLandingPage) {
      console.info('[CACHED]: getRichSnippetSSrFnLandingPage');
      return cachedRichSnippetSSrFnLandingPage;
    }

    const scriptCategoryPage = (
      await graphqlFetch({
        query:
          `query {
          products(filter: { landing_page_id: { eq: "` +
          landingPageId +
          `" } }, currentUrl: "` +
          COMMON.r('BASE_URL') +
          path +
          `"){
                     rich_snippets
                  }
        }`,
      })
    )?.products?.rich_snippets;

    const storeConfigLandingPages = await graphqlFetch({
      query:
        `query  {
              amlanding(id: ` +
        landingPageId +
        `) {
                page_id
                title
                identifier
                page_layout
                layout_columns_count
                layout_include_navigation
                layout_heading
                layout_file
                layout_file_alt
                layout_top_description
                layout_bottom_description
                layout_static_top
                layout_static_bottom
                default_sort_by
                creation_time
                update_time
                is_active
                dynamic_category_id
                dynamic_category_url
                sort_order
                layout_update_xml
                conditions_serialized
                meta_data
                store_id
              }
            }`,
    });

    let storeConfigLandingPage: any = {};
    if (
      JSON.parse(storeConfigLandingPages?.amlanding?.meta_data) &&
      Array.isArray(
        JSON.parse(storeConfigLandingPages?.amlanding?.meta_data)
      ) &&
      JSON.parse(storeConfigLandingPages?.amlanding?.meta_data).length > 0
    ) {
      storeConfigLandingPage = JSON.parse(
        storeConfigLandingPages?.amlanding?.meta_data
      )[0];
    }
    const data = {
      scriptCategoryPage,
      storeConfigLandingPage: storeConfigLandingPage,
    };

    await CacheFile.save('getRichSnippetSSrFnLandingPage', data, 'global');

    return data;
  };

  const getRichSnippetSSrFnBrandPage = async (urlRewriteDatas: any) => {
    const cachedRichSnippetSSrFnLandingPage = await CacheFile.get(
      'getRichSnippetSSrFnBrandPage',
      'global'
    );

    if (cachedRichSnippetSSrFnLandingPage) {
      console.info('[CACHED]: getRichSnippetSSrFnBrandPage');
      return cachedRichSnippetSSrFnLandingPage;
    }

    const storeConfigBrand = await graphqlFetch({
      query: `query {
          ambrandlist {
            items {
              brandId
              label
              url
              img
              image
              description
              short_description
              cnt
              alt
              letter
            }
          }
        }`,
    });

    let scriptCategoryPage: any = {};
    let storeConfigBrandPage: any = {};
    if (
      Array.isArray(storeConfigBrand?.ambrandlist?.items) &&
      storeConfigBrand?.ambrandlist?.items.length > 0
    ) {
      storeConfigBrandPage = storeConfigBrand?.ambrandlist?.items.find(
        (_b: any) =>
          typeof _b?.url === 'string' &&
          urlRewriteDatas?.pathname.includes(urlRewriteDatas?.pathname)
      );

      if (storeConfigBrandPage?.brandId) {
        scriptCategoryPage = (
          await graphqlFetch({
            query:
              `query {
          products(filter: { manufacturer: { eq: "` +
              storeConfigBrandPage?.brandId +
              `" } }, currentUrl: "` +
              COMMON.r('BASE_URL') +
              urlRewriteDatas?.pathname +
              `"){
                     rich_snippets
                  }
        }`,
          })
        )?.products?.rich_snippets;
      }
    }

    const data = {
      scriptCategoryPage,
      storeConfigBrandPage,
    };

    await CacheFile.save('getRichSnippetSSrFnBrandPage', data, 'global');

    return data;
  };

  const getRichSnippetSSrFnCategoryPage = async (
    categoryId: string,
    path: string
  ) => {
    if (!isSSR()) return {};

    const cachedRichSnippetSSrFnCategoryPage = await CacheFile.get(
      'getRichSnippetSSrFnCategoryPage',
      'global'
    );

    if (cachedRichSnippetSSrFnCategoryPage) {
      console.info('[CACHED]: getRichSnippetSSrFnCategoryPage');
      return cachedRichSnippetSSrFnCategoryPage;
    }

    const scriptCategoryPage = (
      await graphqlFetch({
        query:
          `query {
          products(filter: { category_id: { eq: "` +
          categoryId +
          `" } }, currentUrl: "` +
          COMMON.r('BASE_URL') +
          path +
          `"){
                     rich_snippets
                  }
        }`,
      })
    )?.products?.rich_snippets;

    const storeConfigCategoryPage = (
      await graphqlFetch({
        query:
          `query {
                category(id: ` +
          categoryId +
          `) {
              id
              name
              description
              url_path
              url_key
              url_suffix
              meta_title
              meta_keywords
              meta_description   
            }
          }`,
      })
    )?.category;

    const data = {
      scriptCategoryPage,
      storeConfigCategoryPage,
    };

    await CacheFile.save('getRichSnippetSSrFnCategoryPage', data, 'global');

    return data;
  };

  wrapSSRFn(
    PageComponent,
    WithBedRichSnippet,
    getRichSnippetSSrFn,
    undefined,
    webUiAdapterOptions?.ssr
  );

  const displayName =
    PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithBedRichSnippet.displayName = `withBedRichSnippet(${displayName})`;

  return WithBedRichSnippet;
};
