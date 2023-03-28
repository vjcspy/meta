import {
  selectAggregations,
  selectIsUpdatingProducts,
  selectPageFilterInfo,
  selectPageInfo,
  selectProducts,
} from '@modules/catalog/store/products/products.selectors';
import { useSelector } from '@main/packages-web-redux';

export const useProductsState = () => {
  const products = useSelector(selectProducts);
  const aggregations = useSelector(selectAggregations);
  const isUpdatingProducts = useSelector(selectIsUpdatingProducts);
  const pageFilterInfo = useSelector(selectPageFilterInfo);
  const pageInfo = useSelector(selectPageInfo);
  return {
    productsState: products,
    products,
    aggregations,
    isUpdatingProducts,
    pageFilterInfo,
    pageInfo,
  };
};
