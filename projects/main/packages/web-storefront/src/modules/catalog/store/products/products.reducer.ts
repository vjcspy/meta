import type {
  Attribute,
  CatalogCategoryListingFilter,
} from '@main/packages-web-apollo-schema-mgt';
import { createReducer } from '@main/packages-web-redux';
import filter from 'lodash/filter';
import indexOf from 'lodash/indexOf';
import isArray from 'lodash/isArray';
import map from 'lodash/map';
import uniqBy from 'lodash/uniqBy';

import {
  productsAddFilter,
  productsClearFilters,
  productsGetData,
  productsGotAttribute,
  productsGotCategoryData,
  productsGotData,
  productsRemoveFilter,
  productsResolvedFiltersData,
  productsToggleAggregationItem,
  removeSearchString,
  setPageFilterInfo,
  setSearchString,
} from './products.actions';
import { ProductsStateFactory } from './products.state';

export const productsReducer: any = createReducer(
  ProductsStateFactory(),
  (builder) => {
    builder
      .addCase(productsGetData, (state) => {
        state.isUpdatingProducts = true;
      })
      .addCase(productsGotData, (state, action) => {
        if (!isArray(state.products)) {
          state.products = [];
        }

        if (action.payload.mergeWithExisting && action.payload.pageInfo) {
          if (action.payload.pageInfo.current_page == 1) {
            state.products = [];
          }

          state.products = filter(
            state.products,
            (p) =>
              p?.pageInfo?.current_page &&
              action.payload!.pageInfo!.current_page &&
              p?.pageInfo?.current_page !=
                action.payload!.pageInfo!.current_page
          );
          state.products.push(
            ...map(action.payload.products, (p: any) => {
              return { ...p, pageInfo: action.payload.pageInfo };
            })
          );
          // _.uniqBy(state.products, (item) => item.sku);
        } else {
          state.products = action.payload.products;
        }

        state.aggregations = action.payload.aggregations;
        state.isUpdatingProducts = false;
      })
      .addCase(productsResolvedFiltersData, (state, action) => {
        state.filters = action.payload.filters;
      })
      .addCase(productsRemoveFilter, (state, action) => {
        if (Array.isArray(state.filters)) {
          if (action.payload.removeAllValue) {
            state.filters = state.filters.filter(
              (filter) => filter.code !== action.payload.code
            );
          } else {
            const filterIndex = state.filters.findIndex(
              (filter) => filter.code === action.payload.code
            );

            if (filterIndex > -1) {
              if (state.filters[filterIndex].data.eq) {
                state.filters = state.filters.filter(
                  (filter) => filter.code !== action.payload.code
                );
              } else if (Array.isArray(state.filters[filterIndex].data.in)) {
                state.filters[filterIndex].data.in = state.filters[
                  filterIndex
                ].data!.in!.filter(
                  (value: any) => value != action.payload.value
                );
              }
            }
          }
        }
        state.isUpdatingProducts = true;
      })
      .addCase(productsToggleAggregationItem, (state, action) => {
        const attribute: Attribute | undefined = state.attributes.find(
          (a) => a.attribute_code === action.payload.attributeCode
        );
        /*
         * Không được tin tưởng filters trong state hiện tại bởi vì lúc resolve filters chưa có attribute data
         * Lúc add _filter thì phải kiểm trả lại kiểu và set cho đúng
         * */

        if (!attribute) {
          return;
        }

        if (!Array.isArray(state.filters)) {
          state.filters = [];
        }
        let _filter: CatalogCategoryListingFilter | undefined =
          state.filters.find((f) => f.code === action.payload.attributeCode);

        if (indexOf(['multiselect'], attribute.input_type) > -1) {
          if (_filter) {
            if (Array.isArray(_filter.data.in)) {
              if (
                indexOf(_filter.data.in, action.payload.attributeValue) > -1
              ) {
                _filter.data.in = filter(
                  _filter.data.in,
                  (a: any) => a != action.payload.attributeValue
                );
              } else {
                _filter.data.in.push(action.payload.attributeValue);
              }
            } else {
              const dataIn = [action.payload.attributeValue];
              if (typeof _filter.data.eq !== 'undefined') {
                // first resolve filters
                if (_filter.data.eq == action.payload.attributeValue) {
                  state.filters = filter(
                    state.filters,
                    (f) => f.code != action.payload.attributeCode
                  );
                } else {
                  dataIn.push(_filter.data.eq);
                }
              }

              _filter.data = {
                in: dataIn,
              };
            }
          } else {
            _filter = {
              code: action.payload.attributeCode,
              data: { in: [action.payload.attributeValue] },
            };

            state.filters.push(_filter);
          }
        } else {
          if (_filter) {
            if (_filter.data.eq == action.payload.attributeValue) {
              state.filters = filter(
                state.filters,
                (f) => f.code != action.payload.attributeCode
              );
            } else {
              _filter.data = { eq: action.payload.attributeValue };
            }
          } else {
            _filter = {
              code: action.payload.attributeCode,
              data: { eq: action.payload.attributeValue },
            };

            state.filters.push(_filter);
          }
        }
        state.isUpdatingProducts = true;
      })
      .addCase(productsAddFilter, (state, action) => {
        if (!Array.isArray(state.filters)) {
          state.filters = [];
        }
        const filters = state.filters.filter(
          (f) => f.code !== action.payload.code
        );
        const data: any = {};
        if (Array.isArray(action.payload.value)) {
          data['in'] = action.payload.value;
        } else {
          data['eq'] = action.payload.value;
        }

        filters.push({
          code: action.payload.code,
          data,
        });

        state.filters = filters;
        state.isUpdatingProducts = true;
      })
      .addCase(productsClearFilters, (state) => {
        state.filters = undefined;
        state.isUpdatingProducts = true;
        state.pageFilterInfo.currentPage = 1;
      })
      .addCase(productsGotAttribute, (state, action) => {
        state.attributes.push(action.payload.attribute);

        state.attributes = uniqBy(state.attributes, 'attribute_code');
      })
      .addCase(productsGotCategoryData, (state, action) => {
        state.category = action.payload.category;
      })
      .addCase(setSearchString, (state, action) => {
        state.searchString = action.payload.searchString;

        // Hiện tại chưa support search trong category mà lúc nào cũng search all
        state.filters = undefined;
        state.products = [];
        state.aggregations = [];
      })
      .addCase(removeSearchString, (state) => {
        state.searchString = undefined;
        state.products = [];
        state.aggregations = [];
      })
      .addCase(setPageFilterInfo, (state, action) => {
        state.pageFilterInfo = {
          ...state.pageFilterInfo,
          ...action.payload.pageFilterInfo,
        };
      });
  }
);
