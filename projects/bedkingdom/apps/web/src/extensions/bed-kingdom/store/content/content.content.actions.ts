import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'bed_king_content';

const BED_CHANGE_TYPE_SHOW_LIST_PRODUCT = 'BED_CHANGE_TYPE_SHOW_LIST_PRODUCT';
export const bedChangeTypeListProduct = createAction<{
  type: string;
}>(BED_CHANGE_TYPE_SHOW_LIST_PRODUCT, PREFIX);

const BED_SHOW_RESET_PASSWORD = 'BED_SHOW_RESET_PASSWORD';
export const bedShowResetPassword = createAction<{
  status: boolean;
}>(BED_SHOW_RESET_PASSWORD, PREFIX);

const RESOLVED_BRAND_DETAIL = 'RESOLVED_BRAND_DETAIL';
export const bedResolvedBrandDetail = createAction<{
  brandDetail: any;
}>(RESOLVED_BRAND_DETAIL, PREFIX);

const SET_CALCULATOR_FINANCE = 'SET_CALCULATOR_FINANCE';
export const setCalculatorFinance = createAction<{
  value: any;
}>(SET_CALCULATOR_FINANCE, PREFIX);

const GET_CALCULATOR_FINANCE = 'GET_CALCULATOR_FINANCE';
export const getCalculatorFinance = createAction<{}>(
  GET_CALCULATOR_FINANCE,
  PREFIX
);

const SET_IS_OPEN_POPUP = 'SET_IS_OPEN_POPUP';
export const setIsOpenPopup = createAction<{
  value: any;
}>(SET_IS_OPEN_POPUP, PREFIX);

const RESOLVED_AMASTY_PAGE = 'RESOLVED_AMASTY_PAGE';
export const bedResolvedAmastyPage = createAction<{
  amastyPage: any;
}>(RESOLVED_AMASTY_PAGE, PREFIX);

const SET_STATUS_REVIEW = 'SET_STATUS_REVIEW';
export const setStatusReview = createAction<{
  status: any;
}>(SET_STATUS_REVIEW, PREFIX);
