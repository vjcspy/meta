import { createSelector } from '@main/packages-web-redux';
import memoize from 'lodash/memoize';

import type { ProductsState } from './products.state';

export const selectAggregations = (state: { products: ProductsState }) =>
  state.products.aggregations;
export const selectFilters = (state: { products: ProductsState }) =>
  state.products.filters;

export const selectAttributes = (state: { products: ProductsState }) =>
  state.products.attributes;

export const selectAttribute: any = createSelector(
  selectAttributes,
  (attributes) =>
    memoize((attributeCode: string) =>
      attributes.find((a) => a.attribute_code === attributeCode)
    )
);

export const selectProducts = (state: { products: ProductsState }) =>
  state.products.products;

export const selectSearchString = (state: { products: ProductsState }) =>
  state.products.searchString;

export const selectIsUpdatingProducts = (state: { products: ProductsState }) =>
  state.products.isUpdatingProducts;

export const selectPageFilterInfo = (state: { products: ProductsState }) =>
  state.products.pageFilterInfo;

export const selectPageInfo = (state: { products: ProductsState }) =>
  state.products.pageInfo;

export const selectProductTotals = (state: { products: ProductsState }) =>
  state.products.totals;

export const selectRangePriceFilter = (state: { products: ProductsState }) =>
  state.products.rangePriceFilter;
