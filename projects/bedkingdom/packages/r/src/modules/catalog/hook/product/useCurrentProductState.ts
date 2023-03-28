import { useSelector } from '@main/packages-web-redux';
import { selectProduct } from '@modules/catalog/store/product/product.selectors';
import { selectProductInfo } from '@modules/catalog/store/product-info/product-info.selectors';

export const useCurrentProductState = () => {
  const product = useSelector(selectProduct);
  // @ts-ignore
  const productInfo = useSelector(selectProductInfo)(product);

  return {
    state: {
      product,
      productInfo,
    },
  };
};
