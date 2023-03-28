import { getListProductViewed } from '@modules/catalog/util/getProductFromLocalStorage';
import { createUiHOC } from '@web/ui-extension';
import { useEffect, useState } from 'react';

export const withRecentProductData = createUiHOC(() => {
  const [recentProducts, setRecentProducts] = useState<any[]>();
  useEffect(() => {
    const _resolveListProduct = async () => {
      const listProducts = await getListProductViewed();
      if (Array.isArray(listProducts)) {
        setRecentProducts(listProducts);
      }
    };

    _resolveListProduct();
  }, []);

  return { state: { recentProducts } };
}, 'withRecentProductData');
