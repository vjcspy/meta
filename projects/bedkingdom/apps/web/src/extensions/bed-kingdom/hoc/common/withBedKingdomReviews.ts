import { setStatusReview } from '@extensions/bed-kingdom/store/content/content.content.actions';
import { selectShowReview } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { useDispatch, useSelector } from '@main/packages-web-redux';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

export const withBedKingdomReviews = createUiHOC(() => {
  const dispatch = useDispatch();
  const showReview = useSelector(selectShowReview);
  const setShowReview = useCallback((status: any) => {
    dispatch(setStatusReview({ status }));
  }, []);

  return {
    state: {
      showReview,
    },
    actions: {
      setShowReview,
    },
  };
}, 'withBedKingdomReviews');
