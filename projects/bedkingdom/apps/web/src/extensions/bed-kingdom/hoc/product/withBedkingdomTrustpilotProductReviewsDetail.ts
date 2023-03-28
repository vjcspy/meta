import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import {
  useGetBedProductMoreInformationLazyQuery,
  useGetBedTrustpilotProductReviewsDetailLazyQuery,
} from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useCallback, useEffect, useState } from 'react';

export const withBedkingdomTrustpilotProductReviewsDetail = createUiHOC(
  (props) => {
    const [dataReview, setDataReview] = useState<any[]>([]);
    const [dataReviewAttachment, setDataReviewAttachment] = useState<any[]>([]);
    const [flagUpdate, setFlagUpdate] = useState<boolean>(false);
    const [
      getBedTrustpilotProductReviewsDetailQuery,
      getBedTrustpilotProductReviewsDetailRes,
    ] = useGetBedTrustpilotProductReviewsDetailLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });

    useEffect(() => {
      if (props.state?.product?.id) {
        getBedTrustpilotProductReviewsDetailQuery({
          variables: {
            productId: props.state?.product?.id,
            stars: '1,2,3,4,5',
            pageSize: 10,
            currentPage: 1,
          },
        });
      }
    }, [props.state?.product?.id]);

    const getDataReviewProduct = useCallback(
      (productId: any, stars: any, currentPage = 1) => {
        if (productId) {
          if (currentPage > 1) {
            setFlagUpdate(true);
          }
          getBedTrustpilotProductReviewsDetailQuery({
            variables: {
              productId: productId,
              stars: stars.length > 0 ? stars.join() : 0,
              pageSize: 10,
              currentPage: currentPage,
            },
          });
        }
      },
      []
    );

    useEffect(() => {
      if (getBedTrustpilotProductReviewsDetailRes.error) {
        console.error('Could not load Trustpilot Product data');
      }
      if (
        getBedTrustpilotProductReviewsDetailRes.data
          ?.getTrustpilotProductReviewsDetail
      ) {
        if (
          getBedTrustpilotProductReviewsDetailRes?.data
            ?.getTrustpilotProductReviewsDetail?.trustpilot_product_reviews
        ) {
          if (flagUpdate) {
            setDataReview((prevState) => {
              return prevState.concat(
                getBedTrustpilotProductReviewsDetailRes?.data
                  ?.getTrustpilotProductReviewsDetail
                  ?.trustpilot_product_reviews
              );
            });
          } else {
            setDataReview(
              getBedTrustpilotProductReviewsDetailRes?.data
                ?.getTrustpilotProductReviewsDetail?.trustpilot_product_reviews
            );
          }
        }
        if (
          getBedTrustpilotProductReviewsDetailRes?.data
            ?.getTrustpilotProductReviewsDetail?.trustpilot_attachment_summary
        ) {
          if (flagUpdate) {
            setDataReviewAttachment((prevState) =>
              prevState.concat(
                getBedTrustpilotProductReviewsDetailRes?.data
                  ?.getTrustpilotProductReviewsDetail
                  ?.trustpilot_attachment_summary
              )
            );
          } else {
            setDataReviewAttachment(
              getBedTrustpilotProductReviewsDetailRes?.data
                ?.getTrustpilotProductReviewsDetail
                ?.trustpilot_attachment_summary
            );
          }
        }
      }
    }, [
      getBedTrustpilotProductReviewsDetailRes.error,
      getBedTrustpilotProductReviewsDetailRes.data,
    ]);

    return {
      state: {
        dataReview: dataReview || [],
        dataReviewAttachment: dataReviewAttachment || [],
      },
      actions: { getDataReviewProduct },
    };
  },
  'withBedkingdomTrustpilotProductReviewsDetail'
);
