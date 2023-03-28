import { useDispatch, useSelector } from '@main/packages-web-redux';
import { initProductInfo } from '@modules/catalog/store/product-info/product-info.actions';
import { selectProductInfo } from '@modules/catalog/store/product-info/product-info.selectors';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withInitProductInfo = createUiHOC((props: any) => {
  // @ts-ignore
  const productInfo = useSelector(selectProductInfo)(props?.product?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!productInfo && props?.product?.id) {
      dispatch(initProductInfo({ product: props.product }));
    }
  }, [productInfo, props?.product?.id]);

  return {};
}, 'withInitProductInfo');
