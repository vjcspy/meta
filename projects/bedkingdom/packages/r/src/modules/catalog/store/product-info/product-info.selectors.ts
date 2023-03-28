import { createSelector } from '@main/packages-web-redux';
import type { ProductInfoState } from '@modules/catalog/store/product-info/product-info.state';
import memoize from 'lodash/memoize';

export const selectProductInfo: any = createSelector(
  (state: { productInfo: ProductInfoState }) => state.productInfo.products,
  (products) =>
    memoize((productOrId: any) =>
      products.find((pInfo) =>
        typeof productOrId === 'object'
          ? pInfo.product['id'] == productOrId['id']
          : pInfo.product['id'] == productOrId
      )
    )
);
