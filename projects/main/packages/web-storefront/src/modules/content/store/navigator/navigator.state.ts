import type { FilterEqualTypeInput } from '@main/packages-web-apollo-schema-mgt';

export interface NavFilter {
  code: string;
  data: FilterEqualTypeInput;
}

export interface NavSelection {
  type: string;
  name: string; // "Men"
  action: {
    type:
      | 'catalog_category_view'
      | 'attribute_filter'
      | 'link'
      | 'blog'
      | false;
    data:
      | NavFilter[]
      | { url: string }
      | { code: string; filters: NavFilter[] };
  };
  selections: NavSelection[];
}

export interface NavigatorState {
  isMouseInside: boolean;
  mouseLocation: any;
  selections: NavSelection[];
  flyoutSelection?: any;
}

export const NavigatorStateFactory: () => NavigatorState = () => ({
  isMouseInside: false,
  selections: [],
  mouseLocation: {},
});
