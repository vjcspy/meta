import {
  createProductRatingAction,
  getRatingMetadataAfterAction,
} from '@modules/catalog/store/product/product.actions';
import { selectRatingMetadata } from '@modules/catalog/store/product/product.selectors';
import { useGetProductReviewRatingMetaDataLazyQuery } from '@vjcspy/apollo';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useProductRatingMetadata = () => {
  const dispatch = useDispatch();
  const ratingMetaData = useSelector(selectRatingMetadata);

  const ratingMetadata = useSelector(selectRatingMetadata);
  const [ratingMetadataQuery, ratingMetaDataResult] =
    useGetProductReviewRatingMetaDataLazyQuery();

  useEffect(() => {
    if (!ratingMetaData) {
      ratingMetadataQuery();
    }
  }, []);

  useEffect(() => {
    if (ratingMetaDataResult?.error) {
      console.warn('Could not get rating metadata');
    }

    if (ratingMetaDataResult?.data) {
      dispatch(
        getRatingMetadataAfterAction({
          ratingMetadata:
            ratingMetaDataResult?.data.productReviewRatingsMetadata,
        })
      );
    }
  }, [ratingMetaDataResult?.data, ratingMetaDataResult?.error]);

  const createRating = useCallback(
    (rating: {
      nickname: string;
      summary: string;
      text: string;
      ratingInfo: any;
    }) => {
      dispatch(createProductRatingAction(rating));
    },
    []
  );

  return {
    state: {
      ratingMetadata,
    },
    actions: {
      createRating,
    },
  };
};
