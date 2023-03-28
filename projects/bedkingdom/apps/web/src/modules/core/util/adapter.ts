import { withApollo } from '@main/packages-web-apollo';
import { initApolloClient } from '@main/packages-web-apollo/dist/util/initApolloClient';
import { withRedux } from '@main/packages-web-redux';
import { withDomain } from '@main/packages-web-storefront/src/modules/domain/drivers/domain';
import { withStore } from '@main/packages-web-storefront/src/modules/store/drivers/store';
import { withUrlRewrite } from '@main/packages-web-storefront/src/modules/url-rewrite/drivers/url-rewrite';
import { getGraphQlUrl } from '@main/packages-web-storefront/src/util/url';
import { withWebAccount } from '@modules/account/drivers';
import { withWebCatalog } from '@modules/catalog/drivers';
import { withWebCheckout } from '@modules/checkout/drivers';
import { withUi } from '@modules/ui/driver/ui';
import { withAdapter } from '@web/base/dist/lib/adapter/withAdapters';
import { isSSR } from '@web/base/dist/util/isSSR';
import type { NextPage } from 'next';

const ADAPTERS: any[] = [
  withApollo,
  withDomain,
  withStore,
  withRedux,
  withUi,

  withWebAccount,
  withWebCatalog,
  withWebCheckout,
];

export const withWebAdapter = (
  PageComponent: NextPage<any>,
  webUiAdapterOptions?: any
): any => {
  webUiAdapterOptions = { ssr: false, ...webUiAdapterOptions };
  return withAdapter(PageComponent, webUiAdapterOptions, ADAPTERS);
};

export const withWebRewriteAdapter = (
  PageComponent: NextPage<any>,
  webUiAdapterOptions?: any
): any => {
  webUiAdapterOptions = {
    ssr: false,
    apollo: { apiBase: getGraphQlUrl(), initApolloClient },
    ...webUiAdapterOptions,
  };
  if (isSSR()) {
    return withAdapter(PageComponent, webUiAdapterOptions, [
      ...ADAPTERS,
      withUrlRewrite,
      // withBedRichSnippet,
    ]);
  }
  return withAdapter(PageComponent, webUiAdapterOptions, [
    ...ADAPTERS,
    withUrlRewrite,
  ]);
};
