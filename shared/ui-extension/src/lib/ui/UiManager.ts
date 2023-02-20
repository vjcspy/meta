import type { ExtensionConfig, UiHOC } from '../types';
import { ExtensionManager } from './extensions';
import { HOCManager } from './hoc';

export class UiManager {
  static config(uiData: {
    extensionConfigs: ExtensionConfig[];
    uiHOCs?: UiHOC[];
  }) {
    if (uiData?.uiHOCs) {
      HOCManager.getInstance().configHOCs(uiData.uiHOCs);
    }
    ExtensionManager.getInstance().config(uiData.extensionConfigs);
  }
}
