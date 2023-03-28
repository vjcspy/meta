import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { filtersToUrl } from '@modules/catalog/util/filtersToUrl';
import {
  createProductReviewAfterAction,
  createProductReviewErrorAction,
} from '@vjcspy/r/build/modules/catalog/store/product/product.actions';
import {
  productsAddFilter,
  productsClearFilters,
  productsRemoveFilter,
  productsToggleAggregationItem,
} from '@vjcspy/r/build/modules/catalog/store/products/products.actions';
import type { ProductsState } from '@vjcspy/r/build/modules/catalog/store/products/products.state';
import Router from 'next/router';
import { EMPTY } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    switchMap(([_, filters]) => {
      const urlData = filtersToUrl(filters as any);
      Router.push(
        {
          pathname: `/${urlData.pathname}`,
          query: urlData.query,
        },
        undefined,
        {
          shallow: true,
        }
      );

      return EMPTY;
    })
  )
);

const setReviewError$ = createEffect((action$) =>
  action$.pipe(
    ofType(createProductReviewErrorAction),
    map(() => {
      // const errorMessage = translate('create_review_error', {
      //   ns: ['catalog'],
      // });
      // _errorToast(errorMessage);
      return EMPTY;
    })
  )
);

const setReviewSuccess$ = createEffect((action$) =>
  action$.pipe(
    ofType(createProductReviewAfterAction),
    map(() => {
      // const message = translate('create_review_success', {
      //   ns: ['catalog'],
      // });
      // _successToast(message);
      return EMPTY;
    })
  )
);

export const WEB_CATALOG_PRODUCTS_EFFECTS = [
  whenRemoveFilter$,
  setReviewError$,
  setReviewSuccess$,
];
