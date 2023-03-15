import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { UiExtension } from '@web/ui-extension';
import React from 'react';

import { useUrlRewriteContext } from '../context/url-rewrite';

const UrlRewrite: React.FC = React.memo(() => {
  useDebugRender('UrlRewrite');
  const urlRewriteContextValue = useUrlRewriteContext();

  if (
    !urlRewriteContextValue.urlRewriteData ||
    !urlRewriteContextValue.urlRewriteData?.isResolved
  ) {
    return (
      <UiExtension
        uiId="LOADING_INDICATOR"
        global={true}
        defaultMessage={true}
      />
    );
  } else if (
    urlRewriteContextValue.urlRewriteData?.type &&
    urlRewriteContextValue.urlRewriteData?.config_data
  ) {
    return (
      <UiExtension
        extensionDataConfig={urlRewriteContextValue.urlRewriteData.config_data}
      />
    );
  } else {
    // RouterSingleton.push('/notfound');
    // return null;
    return <div>Sorry. We could not resolve url</div>;
  }
});

export default UrlRewrite;
