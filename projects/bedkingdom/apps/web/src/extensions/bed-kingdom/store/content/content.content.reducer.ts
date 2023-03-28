import {
  bedChangeTypeListProduct,
  bedResolvedAmastyPage,
  bedResolvedBrandDetail,
  bedShowResetPassword,
  setCalculatorFinance,
  setIsOpenPopup,
  setStatusReview,
} from '@extensions/bed-kingdom/store/content/content.content.actions';
import { bedContentStateFactory } from '@extensions/bed-kingdom/store/content/content.content.state';
import { createReducer } from '@main/packages-web-redux';

export const bedContentReducer = createReducer(
  bedContentStateFactory(),
  (builder) => {
    builder
      .addCase(bedChangeTypeListProduct, (state, action) => {
        state.typeListProduct = action.payload.type;
      })
      .addCase(bedShowResetPassword, (state, action) => {
        state.statusResetPassword = action.payload.status;
      })
      .addCase(bedResolvedBrandDetail, (state, action) => {
        state.brandDetail = action.payload.brandDetail;
      })
      .addCase(setCalculatorFinance, (state, action) => {
        state.calculatorFinance = action.payload.value;
      })
      .addCase(setIsOpenPopup, (state, action) => {
        state.isPopupOpening = action.payload.value;
      })
      .addCase(bedResolvedAmastyPage, (state, action) => {
        state.amastyPage = action.payload.amastyPage;
      })
      .addCase(setStatusReview, (state, action) => {
        state.showReview = action.payload.status;
      });
  }
);
