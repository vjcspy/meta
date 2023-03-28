import { CatalogPersistent } from '@modules/catalog/util/catalog-persistent';
import { CatalogConstant } from '@modules/catalog/util/constant';
import { getListProductViewed } from '@modules/catalog/util/getProductFromLocalStorage';
import { ProductInterface } from '@vjcspy/apollo';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

export const withInitRecentProduct = createUiHOC(() => {
  const initRecentProduct = useCallback(async (product: any) => {
    try {
      const listProducts = await getListProductViewed();
      if (Array.isArray(listProducts)) {
        if (!listProducts.some((item: any) => item?.id === product?.id)) {
          if (listProducts.length >= 10) {
            listProducts.shift();
          }
          // @ts-ignore
          listProducts.push(product);
          await CatalogPersistent.saveItem(
            CatalogConstant.PRODUCT_VIEWED_KEY,
            listProducts,
            2592000
          );
        } else {
          const listProductNew = listProducts.filter(
            (item: any) => item?.id !== product?.id
          );

          // @ts-ignore
          listProductNew.push(product);
          await CatalogPersistent.saveItem(
            CatalogConstant.PRODUCT_VIEWED_KEY,
            listProductNew,
            2592000
          );
        }
      } else {
        console.error('Could not found product');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return { actions: { initRecentProduct } };
}, 'withInitRecentProduct');
