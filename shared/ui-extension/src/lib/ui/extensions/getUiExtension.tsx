import React, { Suspense, useMemo } from 'react';

import ExtensionBlank from '../../components/ExtensionBlank/extension-blank';
import type { UiComponent } from '../../types';
import { ExtensionCustomizeType } from '../../types';
import { ExtensionManager } from './ExtensionManager';
import { withExtensionHook } from './withExtensionHook';

/**
 * Phải trả về luôn component function cái mà đã được config.
 * Nếu wrap lại thì các nextPage sẽ không work do không expose ra `getInitialProps`
 *
 * @param uiId
 * @returns {React.NamedExoticComponent<object>}
 */
export const getUiExtension = (uiId: string): UiComponent<any> => {
  if (typeof uiId !== 'string') {
    console.error('uiId must be string');

    return ExtensionBlank;
  }

  // if (
  //   !EXCLUDE_CACHE_COMPONENTS.includes(uiId) &&
  //   ExtensionManager.RESOLVED_COMPONENTS.has(uiId)
  // ) {
  //   return ExtensionManager.RESOLVED_COMPONENTS.get(uiId)!;
  // }

  const extCfg = ExtensionManager.getInstance().cptCfg(uiId);
  if (!extCfg) {
    console.warn('Not found cfg for extension id: ' + uiId);

    return ExtensionBlank;
  }

  let CptConfig: any = extCfg.component;
  let OriginComponent: UiComponent<any>;
  if (
    typeof CptConfig === 'object' &&
    typeof CptConfig['defer'] === 'function'
  ) {
    /*
     * Do cần phải config extension trước khi chạy nên nếu không để là function thì tất cả các page đều sẽ load drivers
     * Để tối ưu performance thì lúc nào cần load page nào mới thực hiện inject driver cho page đó
     * */
    OriginComponent = CptConfig.defer();
  } else if (
    typeof CptConfig === 'object' &&
    CptConfig.hasOwnProperty('lazy')
  ) {
    CptConfig = CptConfig.lazy;
    OriginComponent = React.memo((props) => {
      return (
        <>
          <Suspense fallback={null}>
            {/*@ts-ignore*/}
            <CptConfig {...props} />
          </Suspense>
        </>
      );
    });
  } else {
    OriginComponent = CptConfig;
  }

  if (extCfg.customizeType === ExtensionCustomizeType.HOOK) {
    OriginComponent = withExtensionHook(OriginComponent, extCfg);
  }

  // if (Array.isArray(extCfg.hoc) && extCfg.hoc.length > 0) {
  //   OriginComponent = withUiHOC(OriginComponent, extCfg.hoc as string[]);
  // }

  const GetUiExtension = React.memo((props) => {
    const initProps = useMemo(() => {
      return extCfg.initProps ?? {};
    }, []);
    return <OriginComponent {...initProps} {...props} />;
  });

  if (OriginComponent.hasOwnProperty('getInitialProps')) {
    // @ts-ignore
    GetUiExtension['getInitialProps'] = OriginComponent.getInitialProps;
  }

  GetUiExtension.displayName =
    OriginComponent.displayName ?? 'getUiExtension: ' + uiId;

  // ExtensionManager.RESOLVED_COMPONENTS =
  //   ExtensionManager.RESOLVED_COMPONENTS.set(uiId, GetUiExtension);

  return GetUiExtension;
};
