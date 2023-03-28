import { withBedKingdomReviews } from '@extensions/bed-kingdom/hoc/common/withBedKingdomReviews';
import { withBedkingdomTrustpilotProductReviewsDetail } from '@extensions/bed-kingdom/hoc/product/withBedkingdomTrustpilotProductReviewsDetail';
import { withOnlyCurrentProductState } from '@extensions/bed-kingdom/hoc/product/withOnlyCurrentProductState';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useEffect, useRef } from 'react';

const Review = combineHOC(
  withOnlyCurrentProductState,
  withBedkingdomTrustpilotProductReviewsDetail,
  withBedKingdomReviews
)(
  React.memo((props) => {
    const refReview = useRef(null);

    // @ts-ignore
    const executeScroll = () => refReview?.current?.scrollIntoView();

    useEffect(() => {
      if (props?.state?.showReview) {
        executeScroll();
      }
    }, [props?.state?.showReview]);
    // const [showReview, setShowReview] = useState(false);

    return (
      <div
        className="b-product-info b-info-review cursor-pointer"
        ref={refReview}
      >
        <div
          className="b-info-label flex cursor-pointer items-center justify-between"
          onClick={() => {
            props?.actions?.setShowReview(!props?.state?.showReview);
          }}
        >
          Review
          {props?.state?.showReview ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="16px"
            >
              <rect height="64" width="384" x="64" y="224" />
            </svg>
          ) : (
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16px"
              height="16px"
            >
              <path
                fillRule="evenodd"
                d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
              />
            </svg>
          )}
        </div>
        {props?.state?.showReview && (
          <>
            {props?.state?.dataReview && props?.state?.dataReview.length > 0 ? (
              <div
                className={`b-info-content ${
                  props?.state?.showReview && 'active'
                }`}
              >
                <UiExtension
                  uiId="PRODUCT_REPORT_REVIEW"
                  dataReview={props?.state?.dataReview}
                  dataReviewAttachment={props?.state?.dataReviewAttachment}
                  productReportReview={
                    props?.state?.product?.bed_data
                      ?.trustpilot_product_reviews_summary
                  }
                  productId={props.state?.product?.id}
                  getDataReviewProduct={props?.actions?.getDataReviewProduct}
                />
              </div>
            ) : (
              <div className="b-info-content active">
                <h2 className="button-info  mb-3">
                  <strong>No Reviews</strong>
                </h2>
              </div>
            )}
          </>
        )}
      </div>
    );
  })
);

export default Review;
