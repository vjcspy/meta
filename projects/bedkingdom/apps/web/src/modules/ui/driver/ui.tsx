import type { UiContextValue } from '@modules/ui/context/ui';
import { UiContextProvider } from '@modules/ui/context/ui';
import { useWebUiConfig } from '@modules/ui/hook/config/useWebUiConfig';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import type { NextPage } from 'next';
import * as React from 'react';
import { useMemo, useState } from 'react';

export const withUi = (
  PageComponent: any,
  webUiAdapterOptions?: any
): NextPage<any> => {
  const WithUi: NextPage<any> = React.memo((props) => {
    useDebugRender('WithUi');
    const [uiContextValue, setUiContextValue] = useState<UiContextValue>({
      themeName: 'default',
      uiConfig: {},
      ...props?.webUi,
    });
    const {
      state: { webUiConfig },
    } = useWebUiConfig();
    const value: UiContextValue = useMemo(() => {
      return {
        ...uiContextValue,
        uiConfig: webUiConfig,
        setValue: setUiContextValue,
      };
    }, [webUiConfig]);

    return (
      <UiContextProvider value={value}>
        <PageComponent {...props} />
      </UiContextProvider>
    );
  });

  wrapSSRFn(
    PageComponent,
    WithUi,
    undefined,
    undefined,
    webUiAdapterOptions?.ssr
  );

  const displayName =
    PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithUi.displayName = `withUi(${displayName})`;

  return WithUi;
};
