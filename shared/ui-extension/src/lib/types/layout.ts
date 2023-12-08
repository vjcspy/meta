import type { LazyExoticComponent } from 'react';

import type { UiComponent } from './ui';

export enum ExtensionType {
  ROOT,
  HEAD,
  HEAD_COMPONENT,
  COMPONENT,
}

export enum ExtensionCustomizeType {
  FIX,
  HOOK, // Chỉ được add vào trong các hookId, cần có for
  CAN_PUSH, // được push vào structure
  CAN_REMOVE,
  CAN_PUSH_REMOVE,
}

export interface ExtensionConfig {
  uiId: string;
  // Được sử dụng trong TagStackComponent. Chỉ có những tag thoả mãn mới được add vào
  uiTags?: string[];
  // Hiển thị lên layout builder
  title?: string;
  // Mặc định là component type
  type?: ExtensionType;
  component:
    | UiComponent<any>
    | { defer: () => UiComponent<any> }
    | { lazy: LazyExoticComponent<any> }
    | any;
  // Các cách mà component này có thể bị customize. Nếu không khai báo mặc định là FIX
  customizeType?: ExtensionCustomizeType;
  childrenType?: ExtensionType | ExtensionType[];
  initProps?: any;
  /*
   * Khai báo khi kiểu customize là HOOK
   *
   * */
  structure?: ExtensionStructureItem[];

  hoc?: (string | HOCConfig)[];
  config?: any;
  configData?: any;
  priority?: number | (() => number);
  priorityFn?: number | (() => number);
  isDisabled?: boolean;
}

export interface ExtensionStructureItem {
  // Nếu có thì override title của cpt
  title?: string;
  // Cha của nó có kiểu customize là HOOK thì structure cpt phải có hookId
  hookId?: string;
  // Required
  uiId: string;
  customizeType: ExtensionCustomizeType;
  childrenType?: ExtensionType | ExtensionType[];
  structure?: ExtensionStructureItem[];
}

export interface ExtensionDataConfig {
  forHookId?: string; // Nếu layout component có customizeType = HOOK
  uiId?: string; // Nếu layout component có customizeType = CAN_PUSH
  extensionDataConfigs?: ExtensionDataConfig[];

  additionalData?: any;

  // For custom config
  [propName: string]: any;
}

export interface HOCConfig {
  action: 'add' | 'remove';
  name: string;
  before?: string;
  after?: string;
  priority?: number;
}
