import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useState } from 'react';

const ReportReview = combineHOC()(
  React.memo((props) => {
    const [listStars, setListStars] = useState<any[]>([]);

    const filterReviewByStars = useCallback(
      (event: any, val: any) => {
        if (listStars.includes(val)) {
          const starsNew = listStars.filter((it) => it != val);

          setListStars(starsNew);
          props.getDataReviewProduct(props?.productId, starsNew, 1);
        } else {
          const stars = listStars;
          stars.push(val);

          setListStars(stars);
          props.getDataReviewProduct(props?.productId, stars, 1);
        }
      },
      [listStars]
    );

    return (
      <div className="tp-widget-wrapper-layout">
        <div className="tp-widget-summary content-shadow--show">
          <div className="tp-widget-summary">
            <div className="tp-widget-summary__information">
              <div className="tp-widget-summary__stars tp-widget-stars">
                <UiExtension
                  uiId="BEDKINGDOM_TRUST_PILOT_START_SINGLE"
                  star={parseInt(props?.productReportReview?.stars_average, 10)}
                />
              </div>
              <div className="tp-widget-summary__rating">
                <span className="rating">
                  {props?.productReportReview?.stars_average}
                </span>
                / 5<span className="separator">•</span>
                <span className="tp-widget-summary__count">
                  <strong>{props?.productReportReview?.total}</strong> reviews
                </span>
              </div>
              <div className="tp-widget-summary__message">
                <span>
                  {props?.productReportReview?.stars_average} out of{' '}
                  {props?.productReportReview?.stars_average} reviews were
                  collected via Trustpilot
                </span>
                <span>
                  0 out of 0 reviews were collected via Bedkingdom.co.uk
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="tp-widget-content">
          <div className="tp-widget-attributes">
            <div className="tp-widget-attributes__attribute">
              <span className="tp-widget-attributes__attribute__label">
                Quality
              </span>
              <div className="tp-widget-attributes__attribute__stars tp-widget-stars">
                <UiExtension
                  uiId="BEDKINGDOM_TRUST_PILOT_START_SINGLE"
                  star={parseInt(
                    props?.productReportReview?.attributes?.quality,
                    10
                  )}
                />
              </div>
              <span className="tp-widget-attributes__attribute__rating">
                <span className="rating">
                  {props?.productReportReview?.attributes?.quality}
                </span>
                / 5
              </span>
            </div>
            <div className="tp-widget-attributes__attribute">
              <span className="tp-widget-attributes__attribute__label">
                Value for money
              </span>
              <div className="tp-widget-attributes__attribute__stars tp-widget-stars">
                <UiExtension
                  uiId="BEDKINGDOM_TRUST_PILOT_START_SINGLE"
                  star={parseInt(
                    props?.productReportReview?.attributes?.value_for_money,
                    10
                  )}
                />
              </div>
              <span className="tp-widget-attributes__attribute__rating">
                <span className="rating">
                  {props?.productReportReview?.attributes?.value_for_money}
                </span>
                / 5
              </span>
            </div>
          </div>
          <div className="tp-widget-scores">
            <span className="tp-widget-scores__heading">
              <strong>Reviews</strong>
              <span>{props?.productReportReview?.total}</span>
            </span>
            <div className="tp-widget-scorebar tp-widget-scorebar--5 ">
              <div className="tp-widget-scorebar__checkbox tp-widget-checkbox">
                <input
                  type="checkbox"
                  className="tp-widget-checkbox__input"
                  id="checkbox-stars-5"
                  // @ts-ignore
                  disabled={
                    props?.productReportReview?.five_stars === 0 && 'disabled'
                  }
                  onClick={(event) => {
                    filterReviewByStars(event, 5);
                  }}
                />
                <label className="tp-widget-checkbox__label" />
              </div>
              <label
                className="tp-widget-scorebar__label"
                htmlFor="checkbox-stars-5"
              >
                <span className="tp-widget-scorebar__rating">Excellent</span>
                <div className="tp-widget-scorebar__progress-bar progress-bar progress-bar--5 ">
                  <span
                    className={`progress-bar__status score__${Math.round(
                      (props?.productReportReview?.five_stars * 100) /
                        props?.productReportReview?.total
                    )}`}
                  />
                </div>
                <div className="tp-widget-scorebar__percentage">
                  {Math.round(
                    (props?.productReportReview?.five_stars * 100) /
                      props?.productReportReview?.total
                  )}
                  %
                </div>
              </label>
            </div>
            <div className="tp-widget-scorebar tp-widget-scorebar--4 ">
              <div className="tp-widget-scorebar__checkbox tp-widget-checkbox">
                <input
                  type="checkbox"
                  className="tp-widget-checkbox__input"
                  id="checkbox-stars-4"
                  // @ts-ignore
                  disabled={
                    props?.productReportReview?.four_stars === 0 && 'disabled'
                  }
                  // value="4"
                  onClick={(event) => {
                    filterReviewByStars(event, 4);
                  }}
                />
                <label className="tp-widget-checkbox__label" />
              </div>
              <label
                className="tp-widget-scorebar__label"
                htmlFor="checkbox-stars-4"
              >
                <span className="tp-widget-scorebar__rating">Great</span>
                <div className="tp-widget-scorebar__progress-bar progress-bar progress-bar--4 ">
                  <span
                    className={`progress-bar__status score__${Math.round(
                      (props?.productReportReview?.four_stars * 100) /
                        props?.productReportReview?.total
                    )}`}
                  />
                </div>
                <div className="tp-widget-scorebar__percentage">
                  {Math.round(
                    (props?.productReportReview?.four_stars * 100) /
                      props?.productReportReview?.total
                  )}
                  %
                </div>
              </label>
            </div>
            <div className="tp-widget-scorebar tp-widget-scorebar--3 tp-widget-scorebar--disabled">
              <div className="tp-widget-scorebar__checkbox tp-widget-checkbox">
                <input
                  type="checkbox"
                  className="tp-widget-checkbox__input"
                  id="checkbox-stars-3"
                  // @ts-ignore
                  disabled={
                    props?.productReportReview?.three_stars === 0 && 'disabled'
                  }
                  // value="3"
                  onClick={(event) => {
                    filterReviewByStars(event, 3);
                  }}
                />
                <label className="tp-widget-checkbox__label" />
              </div>
              <label
                className="tp-widget-scorebar__label"
                htmlFor="checkbox-stars-3"
              >
                <span className="tp-widget-scorebar__rating">Average</span>
                <div className="tp-widget-scorebar__progress-bar progress-bar progress-bar--3 ">
                  <span
                    className={`progress-bar__status score__${Math.round(
                      (props?.productReportReview?.three_stars * 100) /
                        props?.productReportReview?.total
                    )}`}
                  />
                </div>
                <div className="tp-widget-scorebar__percentage">
                  {Math.round(
                    (props?.productReportReview?.three_stars * 100) /
                      props?.productReportReview?.total
                  )}
                  %
                </div>
              </label>
            </div>
            <div className="tp-widget-scorebar tp-widget-scorebar--2 tp-widget-scorebar--disabled">
              <div className="tp-widget-scorebar__checkbox tp-widget-checkbox">
                <input
                  type="checkbox"
                  className="tp-widget-checkbox__input"
                  id="checkbox-stars-2"
                  // @ts-ignore
                  disabled={
                    props?.productReportReview?.two_stars === 0 && 'disabled'
                  }
                  // value="2"
                  // disabled="true"
                  onClick={(event) => {
                    filterReviewByStars(event, 2);
                  }}
                />
                <label className="tp-widget-checkbox__label" />
              </div>
              <label
                className="tp-widget-scorebar__label"
                htmlFor="checkbox-stars-2"
              >
                <span className="tp-widget-scorebar__rating">Poor</span>
                <div className="tp-widget-scorebar__progress-bar progress-bar progress-bar--2 ">
                  <span
                    className={`progress-bar__status score__${Math.round(
                      (props?.productReportReview?.two_stars * 100) /
                        props?.productReportReview?.total
                    )}`}
                  />
                </div>
                <div className="tp-widget-scorebar__percentage">
                  {Math.round(
                    (props?.productReportReview?.two_stars * 100) /
                      props?.productReportReview?.total
                  )}
                  %
                </div>
              </label>
            </div>
            <div className="tp-widget-scorebar tp-widget-scorebar--1 tp-widget-scorebar--disabled">
              <div className="tp-widget-scorebar__checkbox tp-widget-checkbox">
                <input
                  type="checkbox"
                  className="tp-widget-checkbox__input"
                  id="checkbox-stars-1"
                  // @ts-ignore
                  disabled={
                    props?.productReportReview?.one_star === 0 && 'disabled'
                  }
                  // value="1"
                  // disabled="true"
                  onClick={(event) => {
                    filterReviewByStars(event, 1);
                  }}
                />
                <label className="tp-widget-checkbox__label" />
              </div>
              <label
                className="tp-widget-scorebar__label"
                htmlFor="checkbox-stars-1"
              >
                <span className="tp-widget-scorebar__rating">Bad</span>
                <div className="tp-widget-scorebar__progress-bar progress-bar progress-bar--1 ">
                  <span
                    className={`progress-bar__status score__${Math.round(
                      (props?.productReportReview?.one_star * 100) /
                        props?.productReportReview?.total
                    )}`}
                  />
                </div>
                <div className="tp-widget-scorebar__percentage">
                  {Math.round(
                    (props?.productReportReview?.one_star * 100) /
                      props?.productReportReview?.total
                  )}
                  %
                </div>
              </label>
            </div>
          </div>

          <UiExtension
            uiId="PRODUCT_LIST_REVIEW"
            dataReview={props?.dataReview}
            dataReviewAttachment={props?.dataReviewAttachment}
            reviewCount={props?.productReportReview?.total}
            productId={props?.productId}
            getDataReviewProduct={props?.getDataReviewProduct}
            listStars={listStars}
          />
        </div>
      </div>
    );
  })
);

export default ReportReview;
