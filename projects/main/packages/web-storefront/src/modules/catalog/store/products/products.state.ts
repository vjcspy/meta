import type {
  Attribute,
  CatalogCategoryListingFilter,
} from '@main/packages-web-apollo-schema-mgt/dist/graphql/generated/_generated-hooks';
import { SortEnum } from '@main/packages-web-apollo-schema-mgt/dist/graphql/generated/_generated-hooks';

export interface PageFilterInfo {
  sort: {
    position?: SortEnum;
    name?: SortEnum;
    price?: SortEnum;
  };
  currentPage?: number;
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
  filters?: CatalogCategoryListingFilter[];
  attributes: Attribute[];
  category?: any;
  isUpdatingProducts?: boolean;
  pageFilterInfo: PageFilterInfo;
}

export const ProductsStateFactory = (): ProductsState => ({
  products: [],
  aggregations: [],
  attributes: [],
  pageFilterInfo: {
    sort: {
      position: SortEnum.Desc,
    },
    currentPage: 1,
  },
});
