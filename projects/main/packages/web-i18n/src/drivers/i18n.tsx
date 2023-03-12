import { isSSR } from '@web/base/dist/util/isSSR';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import { isDevelopment } from 'chitility/dist/util/environment';
import i18n from 'i18next';
import FsBackend from 'i18next-fs-backend';
import Backend from 'i18next-http-backend';
import path from 'path';
import React from 'react';
import { getI18n, I18nextProvider, initReactI18next } from 'react-i18next';

const backendOptions: any = {
  loadPath: '/locales/{{lng}}/{{ns}}.json',
};

if (isSSR()) {
  // replace filesystem path from ssr
  backendOptions.loadPath = path.resolve('./public/') + backendOptions.loadPath;
}

i18n
  .use(isSSR() ? FsBackend : Backend)
  // .use(Backend)
  .use(initReactI18next)
  .init({
    lng: 'vi',
    backend: backendOptions,
    fallbackLng: 'en',
    debug: false,
    // /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    // /*
    //  * TODO: Phải có chỗ config ns trước để các module khác có thể khai báo thêm ns. Có thể setup trong UiManager
    //  *  @see: https://chiaki.atlassian.net/browse/KP-121
    //  * */
    ns: [
      'common',
      'catalog',
      'checkout',
      'customer',
      'footer',
      'header',
      'translation',
    ],
    fallbackNS: [
      'common',
      'catalog',
      'checkout',
      'customer',
      'footer',
      'header',
      'translation',
    ],
    // defaultNS: 'common',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      useSuspense: false,
    },
    initImmediate: true,
  });

export const translate = (...data: any[]) => {
  const i18n = getI18n();
  // @ts-ignore
  return i18n.t.bind(i18n)(...data);
};

export const withI18n = (Page: any, webUiAdapterOptions?: any) => {
  const WithI18n: any = React.memo((props) => {
    return (
      // @ts-ignore
      <I18nextProvider i18n={i18n}>
        <Page {...props} />
      </I18nextProvider>
    );
  });

  wrapSSRFn(Page, WithI18n, undefined, undefined, webUiAdapterOptions?.ssr);

  if (isDevelopment()) {
    const displayName = Page.displayName || Page.name || 'PageComponent';
    WithI18n.displayName = `withI18n(${displayName})`;
  }

  return WithI18n;
};
