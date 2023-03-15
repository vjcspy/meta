import { useSelector } from '@main/packages-web-redux';

import {
  selectAggregations,
  selectIsUpdatingProducts,
  selectProducts,
} from '../../store/products/products.selectors';

export const useProductsState = () => {
  const products = useSelector(selectProducts);
  const aggregations = useSelector(selectAggregations);
  const isUpdatingProducts = useSelector(selectIsUpdatingProducts);
  return {
    productsState: products,
    products,
    aggregations,
    isUpdatingProducts,
  };
};
