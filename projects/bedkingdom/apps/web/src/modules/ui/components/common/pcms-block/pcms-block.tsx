import type { ExtensionDataConfig } from '@web/ui-extension';
import { UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

import { usePCMSBlock } from '../../../hook/pcms-block/usePCMSBlock';

const PCMSBlock = React.memo<{
  extensionDataConfig: ExtensionDataConfig;
}>((props) => {
  const urlKeyConfig = props.extensionDataConfig.additionalData?.find(
    (c: any) => c['key'] === 'identifier'
  );

  const pcmsBlockCtn = usePCMSBlock(urlKeyConfig?.value);

  const Content = useMemo(() => {
    if (pcmsBlockCtn.block?.content) {
      return (
        <UiExtension uiId="HTML_PARSE" html={pcmsBlockCtn.block.content} />
      );
    } else {
      return null;
    }
  }, [pcmsBlockCtn.block]);

  return <>{Content}</>;
});
export default PCMSBlock;
