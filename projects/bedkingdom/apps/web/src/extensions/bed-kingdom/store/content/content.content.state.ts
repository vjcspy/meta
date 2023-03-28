export interface BedContentState {
  typeListProduct?: string;
  statusResetPassword?: boolean;
  brandDetail?: any;
  calculatorFinance?: 0;
  isPopupOpening?: false;
  amastyPage?: any;
  showReview?: boolean;
}

export const bedContentStateFactory = (): BedContentState => ({
  typeListProduct: 'grid',
  statusResetPassword: false,
  calculatorFinance: 0,
  isPopupOpening: false,
  showReview: false,
});
