import React, { useMemo } from 'react';

import type {
  ExtensionConfig,
  ExtensionDataConfig,
  UiComponent,
} from '../../types';
import { ExtensionCustomizeType } from '../../types';
import { UiExtension } from './UiExtension';

export const withExtensionHook = (
  OrgComponent: UiComponent<any>,
  extensionConfig: ExtensionConfig,
): UiComponent<any> => {
  return React.memo((props) => {
    const extensionData = useMemo(() => {
      const _extensionData = props.extensionData || {};
      if (
        // extensionDataConfig được pass vào từ url-rewrite, chính là data của extension
        !props.hasOwnProperty('extensionDataConfig') ||
        !Array.isArray(extensionConfig.structure) ||
        extensionConfig.customizeType !== ExtensionCustomizeType.HOOK
      ) {
        return _extensionData;
      }
      _extensionData.hookCpt = {};

      extensionConfig.structure.forEach((s: any) => {
        const mayBeExtensionDataConfig: ExtensionDataConfig | undefined =
          props.extensionDataConfig.extensionDataConfigs.find(
            (c: any) => c && s && c.forHookId === s.hookId,
          );

        if (mayBeExtensionDataConfig) {
          _extensionData.hookCpt[s.hookId] = (
            <UiExtension
              uiId={s.uiId}
              extensionDataConfig={mayBeExtensionDataConfig}
            />
          );
        } else {
          // logger.warn('Could not found hook config for id ' + s['hookId']);
        }
      });

      return _extensionData;
    }, []);

    return <OrgComponent {...props} extensionData={extensionData} />;
  });
};
