import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'PRODUCT';

const GOT_PRODUCT_DATA = 'GOT_PRODUCT_DATA';
export const gotProductData = createAction<{
  product: any;
}>(GOT_PRODUCT_DATA, PREFIX);

const GET_PRODUCT_REVIEWS_PAGE = 'GET_PRODUCT_REVIEWS_PAGE';
export const getProductReviewPageAction = createAction<{
  currentPage: number;
  pageSize: number;
}>(GET_PRODUCT_REVIEWS_PAGE, PREFIX);

const GET_PRODUCT_REVIEWS_PAGE_AFTER = 'GET_PRODUCT_REVIEWS_PAGE_AFTER';
export const getProductReviewPageAfterAction = createAction<{
  productReviewData: any;
}>(GET_PRODUCT_REVIEWS_PAGE_AFTER, PREFIX);

const GET_RATING_METADATA_AFTER = 'GET_RATING_METADATA_AFTER';
export const getRatingMetadataAfterAction = createAction<{
  ratingMetadata: any;
}>(GET_RATING_METADATA_AFTER, PREFIX);

const CREATE_PRODUCT_RATING = 'CREATE_PRODUCT_RATING';
export const createProductRatingAction = createAction<{
  nickname: string;
  summary: string;
  text: string;
  ratingInfo: any;
}>(CREATE_PRODUCT_RATING, PREFIX);

const CREATE_PRODUCT_RATING_AFTER = 'CREATE_PRODUCT_RATING_AFTER';
export const createProductRatingAfter = createAction(
  CREATE_PRODUCT_RATING_AFTER,
  PREFIX
);

const CREATE_PRODUCT_RATING_ERROR = 'CREATE_PRODUCT_RATING_ERROR';
export const createProductRatingError = createAction<{
  error: Error;
}>(CREATE_PRODUCT_RATING_ERROR, PREFIX);

const CREAT_PRODUCT_REVIEWS = 'CREAT_PRODUCT_REVIEWS';
export const createProductReviewAction = createAction<{}>(
  CREAT_PRODUCT_REVIEWS,
  PREFIX
);

const CREAT_PRODUCT_REVIEWS_AFTER = 'CREAT_PRODUCT_REVIEWS_AFTER';
export const createProductReviewAfterAction = createAction<{}>(
  CREAT_PRODUCT_REVIEWS_AFTER,
  PREFIX
);

const CREAT_PRODUCT_REVIEWS_ERROR = 'CREAT_PRODUCT_REVIEWS_ERROR';
export const createProductReviewErrorAction = createAction<{}>(
  CREAT_PRODUCT_REVIEWS_ERROR,
  PREFIX
);

const GOT_PRODUCT_CATEGORY_BASE_ON_URL_AFTER =
  'GOT_PRODUCT_CATEGORY_BASE_ON_URL_AFTER';
export const gotProductCategoryBaseOnUrlAfterAction = createAction<{
  category: any;
}>(GOT_PRODUCT_CATEGORY_BASE_ON_URL_AFTER, PREFIX);
