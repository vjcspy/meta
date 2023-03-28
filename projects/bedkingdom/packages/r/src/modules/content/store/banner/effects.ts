import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { graphqlFetch } from '@util/graphql-fetch';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  getBestSeller,
  getBestSellerAfter,
  getBestSellerError,
} from './actions';

const whenGetBestSeller$ = createEffect((action$) =>
  action$.pipe(
    ofType(getBestSeller),
    switchMap(() =>
      from(
        graphqlFetch({
          query: `query bestSellerProduct{
              bestSellerProduct(
                pageSize: 2
                currentPage: 1
              ) {
                items{
                  url_key
                  image{
                    url
                    label
                  }
                }
              }
            }`,
        })
      ).pipe(
        map((data) => {
          return getBestSellerAfter({ data });
        }),
        catchError((error) => of(getBestSellerError({ error })))
      )
    )
  )
);

export const R_CONTENT_BANNER_EFFECTS = [whenGetBestSeller$];
