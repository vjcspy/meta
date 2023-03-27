import type { SearchResultPageInfo } from '@main/packages-web-apollo-schema-mgt/dist/graphql/generated/_generated-hooks';
import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const prefix = 'PRODUCTS';

const PRODUCTS_GET_DATA = 'PRODUCTS_GET_DATA';
export const productsGetData = createAction(PRODUCTS_GET_DATA, prefix);

const PRODUCTS_GOT_DATA = 'PRODUCTS_GOT_DATA';
export const productsGotData = createAction<{
  products: any[];
  aggregations: any[];
  mergeWithExisting?: boolean;
  pageInfo?: SearchResultPageInfo;
}>(PRODUCTS_GOT_DATA, prefix);

const PRODUCTS_RESOLVED_FILTERS_DATA = 'PRODUCTS_RESOLVED_FILTERS_DATA';
export const productsResolvedFiltersData = createAction<{
  filters: any[];
}>(PRODUCTS_RESOLVED_FILTERS_DATA, prefix);

const PRODUCTS_REMOVE_FILTER = 'PRODUCTS_REMOVE_FILTER';
export const productsRemoveFilter = createAction<{
  code: string;
  value: string;
  removeAllValue?: boolean;
}>(PRODUCTS_REMOVE_FILTER, prefix);

const PRODUCTS_ADD_FILTER = 'PRODUCTS_ADD_FILTER';
export const productsAddFilter = createAction<{
  code: string;
  value: string;
}>(PRODUCTS_ADD_FILTER, prefix);

const PRODUCTS_CLEAR_FILTERS = 'PRODUCTS_CLEAR_FILTERS';
export const productsClearFilters = createAction<any>(
  PRODUCTS_CLEAR_FILTERS,
  prefix
);

const PRODUCTS_UPDATED_URL_WHEN_CHANGE_FILTERS =
  'PRODUCTS_UPDATED_URL_WHEN_CHANGE_FILTERS';
export const productUpdatedUrlWhenChangeFilters = createAction<any>(
  PRODUCTS_UPDATED_URL_WHEN_CHANGE_FILTERS,
  prefix
);

const PRODUCTS_GOT_ATTRIBUTE = 'PRODUCTS_GOT_ATTRIBUTE';
export const productsGotAttribute = createAction<{
  attribute: any;
}>(PRODUCTS_GOT_ATTRIBUTE, prefix);

const PRODUCTS_TOGGLE_AGGREGATION_ITEM = 'PRODUCTS_TOGGLE_AGGREGATION_ITEM';
export const productsToggleAggregationItem = createAction<{
  attributeCode: string;
  attributeValue: any;
}>(PRODUCTS_TOGGLE_AGGREGATION_ITEM, prefix);

const PRODUCTS_GOT_CATEGORY_DATA = 'PRODUCTS_GOT_CATEGORY_DATA';
export const productsGotCategoryData = createAction<{
  category: any;
}>(PRODUCTS_GOT_CATEGORY_DATA, prefix);

const SET_SEARCH_STRING = 'SET_SEARCH_STRING';
export const setSearchString = createAction<{ searchString: string }>(
  SET_SEARCH_STRING,
  prefix
);

const REMOVE_SEARCH_STRING = 'REMOVE_SEARCH_STRING';
export const removeSearchString = createAction(REMOVE_SEARCH_STRING, prefix);

const SET_PAGE_FILTER_INFO = 'SET_PAGE_FILTER_INFO';
export const setPageFilterInfo = createAction<{ pageFilterInfo: any }>(
  SET_PAGE_FILTER_INFO,
  prefix
);
