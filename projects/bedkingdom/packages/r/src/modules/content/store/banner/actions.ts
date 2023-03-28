import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CONTENT';

const GOT_CMS_PAGE = 'GET_CMS_PAGE';
export const gotCmsPageData = createAction<{
  cmsPage: any;
}>(GOT_CMS_PAGE, PREFIX);

const GET_BEST_SELLER = 'GET_BEST_SELLER';
export const getBestSeller = createAction(GET_BEST_SELLER, PREFIX);

const GET_BEST_SELLER_AFTER = 'GET_BEST_SELLER_AFTER';
export const getBestSellerAfter = createAction<{
  data: any[];
}>(GET_BEST_SELLER_AFTER, PREFIX);

const GET_BEST_SELLER_ERROR = 'GET_BEST_SELLER_ERROR';
export const getBestSellerError = createAction<{
  error: Error;
}>(GET_BEST_SELLER_ERROR, PREFIX);
