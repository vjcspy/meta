import { ProductState } from '@modules/catalog/store/product/product.state';

export const selectProduct = (state: { product: ProductState }) =>
  state?.product?.entity;

export const selectProductReviews = (state: { product: ProductState }) =>
  state?.product?.reviews?.data;

export const selectProductReviewRequestPage = (state: {
  product: ProductState;
}) => state?.product?.reviews?.requestPage;

export const selectRatingMetadata = (state: { product: ProductState }) =>
  state?.product?.ratingMetadata;

export const selectLoadingSetReview = (state: { product: ProductState }) =>
  state?.product?.loadingSetReview;

export const selectProductOptions = (state: { product: ProductState }) =>
  state?.product?.entity?.options;

export const selectCategory = (state: { product: ProductState }) =>
  state?.product?.category;
