import type { ExtensionConfig, UiHOC } from '../types';
import { ExtensionManager } from './extensions';
import { HOCManager } from './hoc';

export class UiManager {
  static config(uiData: {
    extensionConfigs: Array<(() => ExtensionConfig[]) | ExtensionConfig[]>;
    uiHOCs?: UiHOC[];
  }) {
    if (uiData?.uiHOCs) {
      HOCManager.getInstance().configHOCs(uiData.uiHOCs);
    }
    for (const config of uiData.extensionConfigs) {
      if (typeof config === 'function') {
        ExtensionManager.getInstance().config(config());
      } else {
        ExtensionManager.getInstance().config(config);
      }
    }
  }

  static delegateDynamicLoader: any;
}
