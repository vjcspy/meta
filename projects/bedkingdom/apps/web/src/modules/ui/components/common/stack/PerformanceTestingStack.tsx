import { useUiContext } from '@modules/ui/context/ui';
import type { ExtensionDataConfig } from '@web/ui-extension';
import { useStackComponent } from '@web/ui-extension';
import React from 'react';

const PerformanceTestingStack = React.memo<{
  extensionDataConfig: ExtensionDataConfig;
}>((props) => {
  const uiContext = useUiContext();
  const { Structures } = useStackComponent(props);
  return <>{uiContext.performance !== true && Structures}</>;
});

PerformanceTestingStack.displayName = 'PerformanceTesting';
export default PerformanceTestingStack;
