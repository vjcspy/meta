import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { EMPTY } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

import { filtersToUrl } from '../../../router/util/filtersToUrl';
import {
  productsAddFilter,
  productsClearFilters,
  productsRemoveFilter,
  productsToggleAggregationItem,
} from './products.actions';
import type { ProductsState } from './products.state';

const whenRemoveFilter$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(
      productsRemoveFilter,
      productsAddFilter,
      productsClearFilters,
      productsToggleAggregationItem
    ),
    withLatestFrom(state$, (v1, v2: { products: ProductsState }) => [
      v1,
      v2.products.filters,
    ]),
    switchMap(([_, filters]) => {
      // @ts-ignore
      const urlData = filtersToUrl(filters);

      RouterSingleton.push(
        {
          pathname: `/${urlData.pathname}`,
          query: urlData.query,
        },
        {
          shallow: true,
        }
      );

      return EMPTY;
    })
  )
);

export const WEB_CATALOG_PRODUCTS_EFFECTS = [whenRemoveFilter$];
