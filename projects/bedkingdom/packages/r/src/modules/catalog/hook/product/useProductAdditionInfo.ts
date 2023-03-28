import { selectProduct } from '@modules/catalog/store/product/product.selectors';
import { useGetProductAdditionInfomationLazyQuery } from '@vjcspy/apollo';
import { useEffect, useState } from 'react';
import { useSelector } from '@main/packages-web-redux';

export const useProductAdditionInfo = () => {
  const product = useSelector(selectProduct);
  const [productAdditionInfo, setProductAdditionInfo] = useState<any>();
  const [productAdditionInfoQuery, productAdditionInfoRes] =
    useGetProductAdditionInfomationLazyQuery();

  useEffect(() => {
    if (product?.sku) {
      productAdditionInfoQuery({
        variables: {
          sku: product.sku,
        },
      });
    }
  }, [product?.sku]);

  useEffect(() => {
    if (productAdditionInfoRes.error) {
      console.warn(
        'Could not get product addition information',
        productAdditionInfoRes.error
      );
    }

    if (
      typeof productAdditionInfoRes.data?.productAdditonInformation?.data ===
      'string'
    ) {
      try {
        setProductAdditionInfo(
          JSON.parse(
            productAdditionInfoRes.data!.productAdditonInformation!.data!
          )
        );
      } catch (e) {}
    }
  }, [productAdditionInfoRes.data, productAdditionInfoRes.error]);

  return {
    state: { productAdditionInfo },
  };
};
