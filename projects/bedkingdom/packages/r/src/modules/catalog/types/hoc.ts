import { ProductInfo } from '@modules/catalog/store/product-info/product-info.state';
import { PageFilterInfo } from '@modules/catalog/store/products/products.state';
import {
  Aggregation,
  Attribute,
  CatalogCategoryListingFilter,
  CategoryTree,
  ProductInterface,
  SearchResultPageInfo,
} from '@vjcspy/apollo';

export interface WithStoreFilterActionsProps {
  actions: {
    removeFilterAction: (
      code: string,
      value: string,
      removeAllValue: boolean
    ) => void;
    addFilterAction: (code: string, value: string | string[]) => void;
    clearFilters: any;
    setSearchStringAction: any;
    removeSearchStringAction: any;
    addFilterNavigateCategory: (categoryId: string) => void;
  };
}

export interface WithStoreFiltersDataProps {
  filters: CatalogCategoryListingFilter[];
}

export interface WithSearchBarContainerProps {
  categories: any[];
  products: any[];
  message: string;
  loading: boolean;
  resultCount?: any;
  handleSubmit: () => void;
  handleChange: (value: string) => void;
  searchString: string;
}

export interface WithProductsContainerProps {
  state: {
    products: any[];
    aggregations: any[];
    isSearching: boolean;
    isLoading: boolean;
    realLoading: boolean;
    isDone: boolean;
    pageFilterInfo: PageFilterInfo;
    currentPage: number;
    totalPage: number;
    totalCount: number;
    categoryInfo: any;
    searchString?: string;
  };
  actions: {
    handleLoadMorePage: () => void;
  };
}

export interface WithAttributeDataProps {
  attribute: Attribute;
}

export interface WithCategoryListProps {
  state: {
    categoryList: CategoryTree;
  };
}

export interface WithCategoryFromMgtProps {
  state: {
    configCategory: any;
    categoryList: CategoryTree;
  };
}

export interface WithPriceFormatProps {
  priceFormat: (price: number) => string;
}

export interface WithProductInfoProps {
  state: {
    productInfo: any;
  };
  fns: {
    configurable: {
      isOptionValueAvailable: (optionId: any, optionValue: any) => boolean;
    };
  };
  actions: {
    configurable: {
      toggleConfigurableOption: (optionId: any, optionValue: any) => void;
    };
  };
}

export interface WithProductDetailProps {
  actions: { queryProductDetailBySky: (sku: string) => void };
  state: {
    product: ProductInterface;
  };
}

export interface WithProductDetailActionsProps {
  actions: {
    setProductInfoQty: (productId: any, qty: number) => void;
  };
}

export interface WithCurrentProductStateProps {
  state: {
    product: ProductInterface;
    productInfo: ProductInfo;
  };
}

export interface WithProductRatingMetadataProps {
  state: {
    ratingMetadata: any;
  };
  actions: {
    createRating: (rating: {
      nickname: string;
      summary: string;
      text: string;
      ratingInfo: any;
    }) => void;
  };
}

export interface WithProductReviewsProps {
  state: {
    productReviewData: any;
    productReviewCountInfo: any;
    loadingSetReview: boolean;
  };
  actions: {
    doGetProductReviewNextPage: (
      currentPage: number,
      pageSize?: number
    ) => void;
  };
}

export interface WithStoreAggregationsDataProps {
  aggregations: Aggregation[];
}

export interface WithAggregationActionsProps {
  actions: {
    toggleAggregationItem: (attributeCode: string, attributeValue: any) => void;
  };
}

export interface WithProductContainerActionsProps {
  actions: {
    setFilterInfo: (info: PageFilterInfo) => void;
  };
}

export interface WithBestSellerDataProps {
  state: {
    bestSellerProducts: ProductInterface[];
  };
}

export interface WithProductWishlistDataProps {
  state: { productInWishlist: any };
}

export interface WithInitRecentProductProps {
  actions: {
    initRecentProduct: (product: ProductInterface) => void;
  };
}

export interface WithRecentProductDataProps {
  state: {
    recentProducts: ProductInterface[];
  };
}

export interface WithProductReviewActionsProps {
  actions: {
    createProductReviewActions: (
      nickname: string,
      summary: string,
      text: string,
      sku: string,
      ratingId: string,
      ratingValue: string
    ) => void;
  };
}

export interface WithProductsStateProps {
  productsState: any;
  products: ProductInterface[];
  aggregations: [Aggregation];
  isUpdatingProducts: boolean;
  pageFilterInfo: PageFilterInfo;
  pageInfo: SearchResultPageInfo;
}
