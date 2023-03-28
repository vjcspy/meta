import type { ExtensionDataConfig } from '@web/ui-extension';
import { UiExtension, useStackComponent } from '@web/ui-extension';
import React from 'react';

const FooterDesktopStackComponent = React.memo<{
  extensionDataConfig: ExtensionDataConfig;
}>((props) => {
  const { Structures } = useStackComponent(props);

  return <UiExtension uiId="ONLY_DESKTOP">{Structures}</UiExtension>;
});
FooterDesktopStackComponent.displayName = 'STACK';
export default FooterDesktopStackComponent;
