import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import { isDevelopment } from 'chitility/dist/util/environment';
import * as React from 'react';
import { useMemo } from 'react';

import { useResolveUrlWithStore } from '../../store/hook/useResolveUrlWithStore';
import { UrlRewriteContextProvider } from '../context/url-rewrite';
import { useResolveUnknownRouter } from '../hook/useResolveUnknownRouter';

/**
 * @see https://chiaki.atlassian.net/browse/KP-26
 *
 * Không phải page nào cũng cần check url rewrite, mà chỉ các page đi qua slug hoặc cần thiết
 * Tắt cả các phần liên quan đến url rewrite sẽ để hết vào đây
 *
 */
export const withUrlRewrite = (
  PageComponent: any,
  webUiAdapterOptions: any
): any => {
  const WithUrlRewrite = React.memo((props: any) => {
    useDebugRender('WithUrlRewrite');
    const fromServer = props.urlRewriteData ?? undefined;
    const { pathname } = useResolveUrlWithStore();
    const { urlRewriteData, setUrlRewriteData } = useResolveUnknownRouter(
      fromServer,
      pathname ?? 'index'
    );

    const urlRewriteContextValue = useMemo(() => {
      return {
        urlRewriteData,
        setUrlRewriteData,
      };
    }, [urlRewriteData]);

    return (
      <UrlRewriteContextProvider value={urlRewriteContextValue}>
        <PageComponent {...props} />
      </UrlRewriteContextProvider>
    );
  });

  // SSR function
  // const getUrlRewriteData = async (ctx: any) => {
  //   console.info('ssr: withUrlRewrite');
  //   if (
  //     // home page
  //     (isEmpty(ctx.query) && ctx.asPath === '/') ||
  //     // slug
  //     Array.isArray(ctx.query['slug'])
  //   ) {
  //     const test = [
  //       'DEFAULT_HEADER',
  //       'DEFAULT_ROOT',
  //       'CMS_BLOCKS',
  //       'STACK',
  //       'CMS_BLOCKS',
  //       'PRODUCTS',
  //       'KINGDOMBED_SERVICES',
  //       'PRODUCTS_BREADCRUMBS',
  //       'PRODUCTS_CATEGORY_INFO',
  //       'PRODUCTS_AGGREGATIONS',
  //       'PRODUCTS_FILTERS',
  //     ];
  //
  //     // @ts-ignore
  //     for (const testKey of test) {
  //       const OriginCpn: any =
  //         ExtensionManager.getInstance().cptCfg(testKey)?.component;
  //       // @ts-ignore
  //       if (typeof OriginCpn?.preload === 'function') {
  //         logger.debug('=>>>>>>>>>>>>>>>>>>>>>>>> PRELOAD ', testKey);
  //         // @ts-ignore
  //         const res = await ExtensionManager.getInstance()
  //           .cptCfg(testKey)
  //           .component.preload();
  //         console.log(res);
  //       }
  //     }
  //
  //     const url: string = isEmpty(ctx.query)
  //       ? ''
  //       : // @ts-ignore
  //         ctx.query!.slug!.join('/');
  //     const resolveUrlData = DomainManager.getInstance().resolveUrl(url);
  //
  //     const domainData = Registry.getInstance().registry(
  //       WEB_DOMAIN_KEY.DOMAIN_DATA
  //     );
  //     if (!domainData || isEmpty(domainData.shopOwnerId)) {
  //       throw new Error('Domain data must be resolved by ssr in driver');
  //     }
  //
  //     const urlRewriteKey =
  //       WEB_URL_REWRITE_KEY.URL_REWRITE_DATA +
  //       '|' +
  //       resolveUrlData.pathname +
  //       '|userId|' +
  //       domainData.shopOwnerId +
  //       '|store_code|' +
  //       resolveUrlData.currentStore.code;
  //
  //     let urlRewriteData: any;
  //     urlRewriteData = await CacheFile.get(
  //       urlRewriteKey,
  //       domainData.shopOwnerId
  //     );
  //
  //     if (!urlRewriteData) {
  //       urlRewriteData = resolveStaticLayout(resolveUrlData.pathname);
  //     }
  //
  //     if (urlRewriteData) {
  //       logger.info('=>> Url rewrite from cached ' + urlRewriteKey);
  //       // save  url rewrite data for current process
  //       Registry.getInstance().register(
  //         WEB_URL_REWRITE_KEY.URL_REWRITE_DATA,
  //         urlRewriteData
  //       );
  //       return {
  //         urlRewriteData,
  //       };
  //     }
  //     logger.info('=>> Resolving url rewrite' + urlRewriteKey);
  //     let resolveUrlRes;
  //     const requestedPath =
  //       resolveUrlData.pathname === '' ? 'index' : resolveUrlData.pathname;
  //     try {
  //       resolveUrlRes = await fetchRoute(
  //         {
  //           apiBase: Registry.getInstance().registry(
  //             R_DEFAULT_VALUE.GRAPHQL_DEFAULT_URL_KEY
  //           ),
  //           route: requestedPath,
  //           userId: domainData.shopOwnerId,
  //         },
  //         resolveUrlData.currentStore
  //       );
  //     } catch (e) {
  //       resolveUrlRes = null;
  //     }
  //
  //     urlRewriteData = resolveChiakiPageResolver(resolveUrlRes, requestedPath);
  //
  //     await CacheFile.save(urlRewriteKey, urlRewriteData);
  //     // save  url rewrite data for current process
  //     Registry.getInstance().register(
  //       WEB_URL_REWRITE_KEY.URL_REWRITE_DATA,
  //       urlRewriteData
  //     );
  //
  //     return {
  //       urlRewriteData,
  //     };
  //   }
  // };

  wrapSSRFn(
    PageComponent,
    WithUrlRewrite,
    undefined,
    undefined,
    webUiAdapterOptions?.ssr
  );

  if (isDevelopment()) {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'PageComponent';
    WithUrlRewrite.displayName = `withUrlRewrite(${displayName})`;
  }

  return WithUrlRewrite;
};

// /**
//  * Cố tình tách việc resolve url rewrite thành 2 phần khác nhau giữa server và client
//  * Ở server thì call qua http fetch
//  * Ở dưới client sẽ sử dụng appolo để tận dụng được caching strategy
//  *
//  * @param opts
//  * @param store Là object store
//  * @returns {Promise<any>}
//  */
// function fetchRoute(
//   opts: { route: string; apiBase: string; userId: string },
//   store: any
// ) {
//   // If the route is empty, request the homepage
//   const route = opts.route || '/';
//
//   const query = `query ResolveURL($url: String!,$userId: String!) {
//         chiakiPageResolver(url: $url,userId: $userId) {
//             type
//             id
//             relative_url
//             redirectCode
//             config_data
//             additional_data
//             metadata
//         }
//     }`;
//
//   const url = new URL(opts.apiBase);
//   url.searchParams.set('query', query);
//   url.searchParams.set(
//     'variables',
//     JSON.stringify({ url: route, userId: opts.userId })
//   );
//   url.searchParams.set('operationName', 'ResolveURL');
//
//   const headers = {
//     'Content-Type': 'application/json',
//     Store: store.code,
//   };
//
//   // If the store is provided include it as part of the request
//   // if (opts.store) {
//   //   headers['Store'] = opts.store;
//   // }
//
//   return fetch(url.toString(), {
//     method: 'GET',
//     credentials: 'omit',
//     headers: new Headers(headers),
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       if (res.errors) {
//         throw new Error(
//           `urlResolver query failed: ${JSON.stringify(res.errors, null, 2)}`
//         );
//       }
//
//       return res;
//     });
// }
