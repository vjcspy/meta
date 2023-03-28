import type { ExtensionDataConfig } from '@web/ui-extension';
import { UiExtension, useStackComponent } from '@web/ui-extension';
import React from 'react';

const FooterMobileStackComponent = React.memo<{
  extensionDataConfig: ExtensionDataConfig;
}>((props) => {
  const { Structures } = useStackComponent(props);

  return <UiExtension uiId="ONLY_MOBILE">{Structures}</UiExtension>;
});
FooterMobileStackComponent.displayName = 'STACK';
export default FooterMobileStackComponent;
