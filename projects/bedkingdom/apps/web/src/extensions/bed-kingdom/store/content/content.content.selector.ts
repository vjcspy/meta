import type { BedContentState } from '@extensions/bed-kingdom/store/content/content.content.state';

export const selectTypeLisData = (state: {
  bed_king: { content: BedContentState };
}) => state.bed_king?.content?.typeListProduct;

export const selectStatusResetPassWord = (state: {
  bed_king: { content: BedContentState };
}) => state.bed_king?.content?.statusResetPassword;

export const selectBrandDetail = (state: {
  bed_king: { content: BedContentState };
}) => state.bed_king?.content?.brandDetail;

export const selectCalculatorFinance = (state: {
  bed_king: { content: BedContentState };
}) => state.bed_king?.content?.calculatorFinance;

export const selectIsPopupOpening = (state: {
  bed_king: { content: BedContentState };
}) => state.bed_king?.content?.isPopupOpening;

export const selectAmastyPage = (state: {
  bed_king: { content: BedContentState };
}) => state.bed_king?.content?.amastyPage;

export const selectShowReview = (state: {
  bed_king: { content: BedContentState };
}) => state.bed_king?.content?.showReview;
