import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import {
  createProductRatingAction,
  createProductRatingAfter,
  createProductRatingError,
} from '@modules/catalog/store/product/product.actions';
import { graphqlFetch } from '@util/graphql-fetch';
import { from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

const createProductRating$ = createEffect((action$, state$: any) =>
  action$.pipe(
    ofType(createProductRatingAction),
    withLatestFrom(state$, (v1, v2: any) => [v1, v2.product.entity]),
    filter(([_ratingData, product]) => product && product['sku']),
    switchMap(([ratingData, product]) => {
      console.log(ratingData);
      return from(
        graphqlFetch({
          query: `
        mutation createProductReview($nickname: String!,$summary : String!, $text: String!,$sku:String!, $ratingId: String!, $ratingValue: String!){
    createProductReview(input: {
        nickname: $nickname,
        ratings:{
            id: $ratingId,
            value_id: $ratingValue
        }
        sku: $sku,
        summary: $summary,
        text: $text
    }){
        __typename
    }
}
        `,
          variables: {
            nickname: ratingData.payload['nickname'],
            summary: ratingData.payload['summary'],
            text: ratingData.payload['text'],
            sku: product['sku'],
            ratingId: ratingData.payload['ratingInfo']['id'],
            ratingValue: ratingData.payload['ratingInfo']['value'],
          },
        })
      ).pipe(
        map((res) => {
          console.log(res);
          return createProductRatingAfter({});
        }),
        catchError((error) => of(createProductRatingError({ error })))
      );
    })
  )
);

export const R_CATALOG_EFFECTS = [createProductRating$];
