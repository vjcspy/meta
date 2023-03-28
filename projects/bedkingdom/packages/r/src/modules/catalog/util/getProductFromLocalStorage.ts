import { CatalogPersistent } from './catalog-persistent';
import { CatalogConstant } from './constant';

export const getListProductViewed = async () => {
  const listProducts = await CatalogPersistent.getItem(
    CatalogConstant.PRODUCT_VIEWED_KEY
  );

  if (listProducts) {
    return listProducts;
  } else {
    return [];
  }
};
