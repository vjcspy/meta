export interface ProductState {
  entity?: any;
  reviews?: {
    requestPage: {
      currentPage: number;
      pageSize: number;
    };
    data?: any;
  };
  ratingMetadata?: any;
  loadingSetReview?: boolean;
  category?: any;
}

export const productStateFactory = (): ProductState => ({});
