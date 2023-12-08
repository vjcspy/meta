import React, { useMemo } from 'react';

import type { ExtensionDataConfig } from '../../types';
import { getUiExtension } from './getUiExtension';

export const UiExtension = React.memo<{
  uiId?: string;
  extensionDataConfig?: ExtensionDataConfig;
  [propName: string]: any;
}>((props) => {
  const uiId = useMemo(() => {
    const _uiId = props?.uiId || props?.extensionDataConfig?.uiId;

    if (typeof _uiId !== 'string') {
      throw new Error('UiExtension must have `uiId` property');
    }

    return _uiId;
  }, [props]);
  // logger.render('UiExtension: ' + uiId);

  // const Component = useMemo(() => {
  //   const C = getUiExtension(uiId);
  //
  //   return <C {...props} />;
  // }, [uiId]);
  //
  // return <>{Component}</>;

  const Component = useMemo(
    () => getUiExtension(uiId),
    [props?.extensionDataConfig, uiId],
  );

  Component.displayName = `UiExtension: ${uiId}`;

  return <Component {...props} />;
});

UiExtension.displayName = 'UiExtensionWrapper';
