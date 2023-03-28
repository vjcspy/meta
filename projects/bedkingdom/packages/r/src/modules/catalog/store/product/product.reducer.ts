import {
  createProductReviewAction,
  createProductReviewAfterAction,
  createProductReviewErrorAction,
  getProductReviewPageAction,
  getProductReviewPageAfterAction,
  getRatingMetadataAfterAction,
  gotProductCategoryBaseOnUrlAfterAction,
  gotProductData,
} from '@modules/catalog/store/product/product.actions';
import { productStateFactory } from '@modules/catalog/store/product/product.state';
import { createReducer } from '@main/packages-web-redux';

export const productReducer = createReducer(productStateFactory(), (builder) =>
  builder
    .addCase(gotProductData, (state, action) => {
      state.entity = action.payload.product;
    })
    .addCase(getProductReviewPageAfterAction, (state, action) => {
      if (typeof state.reviews === 'undefined') {
        state.reviews = {
          requestPage: {
            currentPage: 1,
            pageSize: 5,
          },
          data: action.payload.productReviewData,
        };
      } else {
        state.reviews.data = action.payload.productReviewData;
      }
    })
    .addCase(getProductReviewPageAction, (state, action) => {
      if (typeof state.reviews === 'undefined') {
        state.reviews = {
          requestPage: {
            currentPage: 1,
            pageSize: 5,
          },
        };
      } else {
        state.reviews.requestPage = {
          currentPage: action.payload.currentPage,
          pageSize: action.payload.pageSize,
        };
      }
    })
    .addCase(getRatingMetadataAfterAction, (state, action) => {
      state.ratingMetadata = action.payload.ratingMetadata;
    })
    .addCase(createProductReviewAction, (state) => {
      state.loadingSetReview = true;
    })
    .addCase(createProductReviewAfterAction, (state) => {
      state.loadingSetReview = false;
    })
    .addCase(createProductReviewErrorAction, (state) => {
      state.loadingSetReview = false;
    })
    .addCase(gotProductCategoryBaseOnUrlAfterAction, (state, action) => {
      state.category = action.payload.category;
    })
);
