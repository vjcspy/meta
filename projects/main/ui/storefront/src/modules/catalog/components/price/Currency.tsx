import { withPriceFormat } from '@main/packages-web-storefront/src/modules/catalog/hoc/withPriceFormat';
import { combineHOC } from '@web/ui-extension';
import React, { useCallback } from 'react';

export default combineHOC(withPriceFormat)(function Currency(props) {
  const formatPrice = useCallback((price?: any) => {
    if ((!price && isNaN(price)) || typeof props.priceFormat !== 'function') {
      return '-';
    }
    return props.priceFormat(price);
  }, []);

  return <>{formatPrice(props.price ?? 0)}</>;
});
