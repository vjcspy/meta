import {
  ExtensionDataConfig,
  useStackComponent,
} from '@web/ui-extension';
import React from 'react';

const StackComponent = React.memo<{
  extensionDataConfig: ExtensionDataConfig;
}>((props) => {
  const { Structures } = useStackComponent(props);

  return <>{Structures}</>;
});
StackComponent.displayName = 'STACK';
export default StackComponent;
