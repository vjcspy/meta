import React, { useMemo } from 'react';

import type { ExtensionDataConfig } from '../../../types';
import { UiExtension } from '../../extensions';

export const useStackComponent = (props: {
  extensionDataConfig: ExtensionDataConfig;
}) => {
  const Structures = useMemo(() => {
    if (!Array.isArray(props.extensionDataConfig.extensionDataConfigs)) {
      return null;
    }

    return props.extensionDataConfig.extensionDataConfigs?.map((s, index) => {
      if (s.uiId) {
        return (
          <UiExtension
            key={`${s.uiId}${index}`}
            uiId={s.uiId}
            extensionDataConfig={s}
          />
        );
      }

      return null;
    });
  }, [props?.extensionDataConfig?.extensionDataConfigs]);

  return {
    Structures,
  };
};
