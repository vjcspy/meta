import { combineHOC, UiExtension } from '@web/ui-extension';
import moment from 'moment/moment';
import React, { useCallback, useState } from 'react';

const LisReview = combineHOC()(
  React.memo((props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const getSrcImgReview = useCallback((arrItems: any) => {
      let srcs = '';
      if (
        JSON.parse(arrItems[0].processed_files).filter(
          (it: any) => it?.dimension === '360pxWide'
        ).length > 0
      ) {
        srcs = JSON.parse(arrItems[0].processed_files).filter(
          (it: any) => it?.dimension === '360pxWide'
        )[0]?.url;
      }
      return srcs;
    }, []);
    return (
      <>
        {props?.dataReview &&
          props?.dataReview.map((item: any) => (
            <div
              className="tp-widget-review"
              key={JSON.stringify(item?.review_id)}
            >
              <div className="tp-widget-review__date">
                {moment(item?.created_at).format('DD MMMM')}
              </div>
              <div className="tp-widget-review__heading">
                <span className="tp-widget-review__display-name secondary-text">
                  {item?.consumer_display_name}
                </span>
                <div className="tp-widget-review__score">
                  <div className="tp-widget-review__stars tp-widget-stars">
                    <UiExtension
                      uiId="BEDKINGDOM_TRUST_PILOT_START_SINGLE"
                      star={Math.round(item?.stars) || 0}
                    />
                  </div>
                  {/* tp-widget-review__rating--expanded */}
                  <div className="tp-widget-review__rating ">
                    <span className="tp-widget-review__rating__label secondary-text">
                      More details
                    </span>
                    <span className="tp-widget-review__rating__label tp-widget-review__rating__label--collapse secondary-text">
                      Fewer details
                    </span>
                    <span className="tp-widget-review__rating__label__arrow secondary-text-arrow" />
                    <div className="tp-widget-review__rating__modal modal">
                      <div className="modal__attribute">
                        <span className="modal__attribute__label">Quality</span>
                        <div className="modal__attribute__stars">
                          <UiExtension
                            uiId="BEDKINGDOM_TRUST_PILOT_START_SINGLE"
                            star={
                              Math.round(
                                JSON.parse(item?.attributes).Quality
                              ) || 0
                            }
                          />
                        </div>
                      </div>
                      <div className="modal__attribute">
                        <span className="modal__attribute__label">
                          Value for money
                        </span>
                        <div className="modal__attribute__stars">
                          <UiExtension
                            uiId="BEDKINGDOM_TRUST_PILOT_START_SINGLE"
                            star={
                              Math.round(
                                JSON.parse(item?.attributes)['Value for money']
                              ) || 0
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tp-widget-review__text">
                <span>{item?.content}</span>
                <br />
                {props?.dataReviewAttachment &&
                  props?.dataReviewAttachment.filter(
                    (att: any) => att?.review_id === item?.review_id
                  ).length > 0 && (
                    <img
                      className=""
                      src={getSrcImgReview(
                        props?.dataReviewAttachment.filter(
                          (att: any) => att?.review_id === item?.review_id
                        )
                      )}
                      alt=""
                      // height="50px"
                      // width="50px"
                      loading="lazy"
                    />
                  )}
              </div>
              <div className="tp-widget-review__source popup-activator">
                <span className="fa fa-check-circle pr-2" aria-hidden="true" />
                Collected via Trustpilot
                <div className="tp-widget-review__source__information">
                  <span>
                    The reviews displayed originate from different sources
                  </span>
                  <ul>
                    <li>
                      Reviews marked “Collected via Trustpilot” originate from
                      Trustpilot verified orders.
                    </li>
                    <li>
                      Reviews marked “Collected via Bedkingdom.co.uk” originate
                      from sources other than Trustpilot.
                    </li>
                  </ul>
                  <p>
                    <a
                      href="https://uk.trustpilot.com/trust/how-reviews-work?utm_medium=Trustbox&amp;utm_source=ProductListImported"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Learn how Trustpilot ensures reviews are genuine.
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        {props?.dataReview.length < props?.reviewCount && (
          <div className="tp-widget-review">
            <span
              className="tp-widget-review__display-name secondary-text"
              onClick={() => {
                setCurrentPage(currentPage + 1);
                props?.getDataReviewProduct(
                  props.productId,
                  props.listStars,
                  currentPage + 1
                );
              }}
            >
              Load more reviews.
            </span>
          </div>
        )}
      </>
    );
  })
);

export default LisReview;
