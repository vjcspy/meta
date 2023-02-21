import type { ComponentType } from 'react';

export type WebUiComponentConfig = {
  uiId: string;
  uiTags: string[];
  component: UiComponent<any> | { PAGE: () => UiComponent<any> };
  hoc?: any[];
  priorityFn?: () => number;
};

/**
 * Chỉ có một kiểu chung dành cho cả Page, cả Component con là WebUiComponent
 */
export type UiComponent<T> = ComponentType<T & Record<any, any>>;

/**
 * HOC cho webui component
 * Đây là cách mà chúng ta có thể truyền thêm data vào props cho 1 component
 */
export type UiHOC = (
  Component: ComponentType<any>,
  props: any
) => ComponentType<any>;
