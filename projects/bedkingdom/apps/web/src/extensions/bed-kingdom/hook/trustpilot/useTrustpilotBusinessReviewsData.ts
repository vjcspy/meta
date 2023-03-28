import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useGetTrustpilotBusinessReviewsLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { useEffect } from 'react';

export const useTrustpilotBusinessReviewsData = () => {
  const [getTrustpilotBusinessReviewsQuery, getTrustpilotBusinessReviewsRes] =
    useGetTrustpilotBusinessReviewsLazyQuery({
      fetchPolicy: FetchPolicyResolve.withLifetime(
        'useGetTrustpilotBusinessReviewsQuery'
      ),
      variables: {},
    });

  useEffect(() => {
    getTrustpilotBusinessReviewsQuery();
  }, []);

  useEffect(() => {
    if (getTrustpilotBusinessReviewsRes.error) {
      console.error('Could not load Trustpilot Business Reviews` data');
    }
  }, [getTrustpilotBusinessReviewsRes.error]);

  return {
    state: {
      businessReviewsData:
        getTrustpilotBusinessReviewsRes?.data?.getTrustpilotBusinessReviews,
    },
  };
};
