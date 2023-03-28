import type {
  Attribute,
  CatalogCategoryListingFilter,
  SearchResultPageInfo,
} from '@vjcspy/apollo';
import { SortEnum } from '@vjcspy/apollo';

export interface PageFilterInfo {
  sort: {
    position?: SortEnum;
    name?: SortEnum;
    price?: SortEnum;
  };
  currentPage?: number;
}
export interface RangePriceFilter {
  min: any;
  max: any;
}

export interface ProductsState {
  products: any[];
  aggregations: any[];
  searchString?: string;
  /*
   * Filters luôn nằm trên url,
   * Lúc đầu vào page thì resolve url cho vào state
   * Sau khi user thực hiện action thêm filter thì lại đẩy lên url
   */
  filters?: CatalogCategoryListingFilter[] | any[];
  attributes: Attribute[];
  category?: any;
  isUpdatingProducts?: boolean;
  pageFilterInfo: PageFilterInfo;
  pageInfo?: SearchResultPageInfo;
  totals?: number;
  rangePriceFilter?: RangePriceFilter;
}

export const ProductsStateFactory = (): ProductsState => ({
  products: [],
  aggregations: [],
  attributes: [],
  pageFilterInfo: {
    sort: {
      position: SortEnum.Asc,
    },
    currentPage: 1,
  },
  rangePriceFilter: {
    min: 0,
    max: 0,
  },
});
