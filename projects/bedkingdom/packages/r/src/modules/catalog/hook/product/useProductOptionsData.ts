import { selectProductOptions } from '@modules/catalog/store/product/product.selectors';
import { useSelector } from '@main/packages-web-redux';

export const useProductCustomizableOptionsData = () => {
  const customizableOptions = useSelector(selectProductOptions);
  return { state: { customizableOptions } };
};
