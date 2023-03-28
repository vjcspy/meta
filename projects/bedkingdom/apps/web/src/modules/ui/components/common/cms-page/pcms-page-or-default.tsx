import type { ExtensionDataConfig } from '@web/ui-extension';
import { UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

import { usePCMSPage } from '../../../hook/pcms-page/usePCMSPage';

const PCMSPage = React.memo<{
  extensionDataConfig: ExtensionDataConfig;
}>((props) => {
  const urlKeyConfig = props.extensionDataConfig.additionalData?.find(
    (c: any) => c['key'] === 'urlKey'
  );

  const defaultWhenNotFound = props.extensionDataConfig.additionalData?.find(
    (c: any) => c['key'] === 'defaultWhenNotFound'
  );

  const pcmsPageCtn = usePCMSPage(urlKeyConfig?.value);

  const Content = useMemo(() => {
    if (pcmsPageCtn.page) {
      return <UiExtension uiId="HTML_PARSE" html={pcmsPageCtn.page.content} />;
    } else if (defaultWhenNotFound && defaultWhenNotFound.value?.uiId) {
      return (
        <UiExtension
          extensionDataConfig={defaultWhenNotFound.value?.extensionDataConfig}
        />
      );
    } else {
      return null;
    }
  }, [pcmsPageCtn.page]);

  return <>{Content}</>;
});
export default PCMSPage;
