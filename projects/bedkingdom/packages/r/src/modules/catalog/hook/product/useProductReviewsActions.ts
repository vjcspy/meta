import {
  createProductReviewAction,
  createProductReviewAfterAction,
  createProductReviewErrorAction,
} from '@modules/catalog/store/product/product.actions';
import { useCreateProductReviewMutation } from '@vjcspy/apollo';
import { useCallback, useEffect } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useProductReviewsActions = () => {
  const dispatch = useDispatch();
  const [createProductReviewMutation, createProductReviewData] =
    useCreateProductReviewMutation();

  const createProductReviewActions = useCallback(
    (
      nickname: string,
      summary: string,
      text: string,
      sku: string,
      ratingId: string,
      ratingValue: string
    ) => {
      if (nickname && summary && text && sku && ratingId && ratingValue) {
        dispatch(createProductReviewAction());
        createProductReviewMutation({
          variables: {
            nickname,
            summary,
            text,
            sku,
            ratingId,
            ratingValue,
          },
        })
          .then()
          .catch(() => {});
      }
    },
    []
  );

  useEffect(() => {
    if (createProductReviewData.error) {
      console.error(
        'Could not get product review data',
        createProductReviewData.error
      );
      dispatch(createProductReviewErrorAction());
    }
    if (createProductReviewData.data) {
      dispatch(createProductReviewAfterAction());
    }
  }, [createProductReviewData?.data, createProductReviewData?.error]);

  return {
    actions: {
      createProductReviewActions,
    },
  };
};
