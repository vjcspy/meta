import { UiExtension } from '@web/ui-extension';
import React, { useCallback } from 'react';

const TrustPilotStartOnListItem: React.FC<{ dataRate: any }> = React.memo(
  (props) => {
    const checkRate = useCallback(
      (number: any) => {
        if (isNaN(number)) {
          return 0;
        }
        number = parseInt(number);
        if (number > 0 && parseInt(props.dataRate?.total) > 0) {
          const show =
            (parseFloat(number) * 100) / parseFloat(props.dataRate?.total);
          return parseInt(show.toString(), 10);
        }
        return 0;
      },
      [props.dataRate?.total]
    );

    if (props.dataRate === null) {
      return null;
    }
    return (
      <div className="productList__trustpilot__wrap">
        <div className="productList__trustpilot trustpilot-widget">
          <div className="productList__stars">
            <div className="tp-widget-stars">
              <div
                className={`tp-stars tp-stars--${
                  Math.round(props.dataRate?.stars_average) || 0
                }`}
              >
                <div className="tp-stars__inner">
                  <svg viewBox="0 0 251 46" xmlns="http://www.w3.org/2000/svg">
                    <g className="tp-star">
                      <path
                        className="tp-star__canvas"
                        d="M0 46.330002h46.375586V0H0z"
                      />
                      <path
                        className="tp-star__shape"
                        d="M39.533936 19.711433L13.230239 38.80065l3.838216-11.797827L7.02115 19.711433h12.418975l3.837417-11.798624 3.837418 11.798624h12.418975zM23.2785 31.510075l7.183595-1.509576 2.862114 8.800152L23.2785 31.510075z"
                      />
                    </g>
                    <g className="tp-star">
                      <path
                        className="tp-star__canvas"
                        d="M51.24816 46.330002h46.375587V0H51.248161z"
                      />
                      <path
                        className="tp-star__canvas--half"
                        d="M51.24816 46.330002h23.187793V0H51.248161z"
                      />
                      <path
                        className="tp-star__shape"
                        d="M74.990978 31.32991L81.150908 30 84 39l-9.660206-7.202786L64.30279 39l3.895636-11.840666L58 19.841466h12.605577L74.499595 8l3.895637 11.841466H91L74.990978 31.329909z"
                      />
                    </g>
                    <g className="tp-star">
                      <path
                        className="tp-star__canvas"
                        d="M102.532209 46.330002h46.375586V0h-46.375586z"
                      />
                      <path
                        className="tp-star__canvas--half"
                        d="M102.532209 46.330002h23.187793V0h-23.187793z"
                      />
                      <path
                        className="tp-star__shape"
                        d="M142.066994 19.711433L115.763298 38.80065l3.838215-11.797827-10.047304-7.291391h12.418975l3.837418-11.798624 3.837417 11.798624h12.418975zM125.81156 31.510075l7.183595-1.509576 2.862113 8.800152-10.045708-7.290576z"
                      />
                    </g>
                    <g className="tp-star">
                      <path
                        className="tp-star__canvas"
                        d="M153.815458 46.330002h46.375586V0h-46.375586z"
                      />
                      <path
                        className="tp-star__canvas--half"
                        d="M153.815458 46.330002h23.187793V0h-23.187793z"
                      />
                      <path
                        className="tp-star__shape"
                        d="M193.348355 19.711433L167.045457 38.80065l3.837417-11.797827-10.047303-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418974zM177.09292 31.510075l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
                      />
                    </g>
                    <g className="tp-star">
                      <path
                        className="tp-star__canvas"
                        d="M205.064416 46.330002h46.375587V0h-46.375587z"
                      />
                      <path
                        className="tp-star__canvas--half"
                        d="M205.064416 46.330002h23.187793V0h-23.187793z"
                      />
                      <path
                        className="tp-star__shape"
                        d="M244.597022 19.711433l-26.3029 19.089218 3.837419-11.797827-10.047304-7.291391h12.418974l3.837418-11.798624 3.837418 11.798624h12.418975zm-16.255436 11.798642l7.183595-1.509576 2.862114 8.800152-10.045709-7.290576z"
                      />
                    </g>
                  </svg>
                </div>
              </div>
              <UiExtension uiId="ONLY_DESKTOP">
                <div className="tp-widget-readmore hidden cursor-pointer text-13px md:block lg:text-14px">
                  {props.dataRate?.total || 0} reviews
                </div>
                <span className="tp-widget-readmore-arrow hidden cursor-pointer md:block" />
              </UiExtension>
            </div>

            <div className="tp-widget-wrapper">
              <div className="tp-widget-productinfo">
                {props.dataRate?.stars_average || 0} out of{' '}
                {props.dataRate?.total || 0}
              </div>
              <div className="tp-widget-businessinfo">
                <div className="score">
                  <div className="score__stars">5 stars</div>
                  <div className="score__bar">
                    <div
                      className={`score__bar__fill score__bar__fill--5 score__${checkRate(
                        props.dataRate?.five_stars
                      )}`}
                    />
                  </div>
                  <div className="score__number">
                    ({props.dataRate?.five_stars || 0})
                  </div>
                </div>
                <div className="score">
                  <div className="score__stars">4 stars</div>
                  <div className="score__bar">
                    <div
                      className={`score__bar__fill score__bar__fill--4 score__${checkRate(
                        props.dataRate?.four_stars
                      )}`}
                    />
                  </div>
                  <div className="score__number">
                    ({props.dataRate?.four_stars || 0})
                  </div>
                </div>
                <div className="score">
                  <div className="score__stars">3 stars</div>
                  <div className="score__bar">
                    <div
                      className={`score__bar__fill score__bar__fill--3 score__${checkRate(
                        props.dataRate?.three_stars
                      )}`}
                    />
                  </div>
                  <div className="score__number">
                    ({props.dataRate?.three_stars || 0})
                  </div>
                </div>
                <div className="score">
                  <div className="score__stars">2 stars</div>
                  <div className="score__bar">
                    <div
                      className={`score__bar__fill score__bar__fill--2 score__${checkRate(
                        props.dataRate?.two_stars
                      )}`}
                    />
                  </div>
                  <div className="score__number">
                    ({props.dataRate?.two_stars || 0})
                  </div>
                </div>
                <div className="score">
                  <div className="score__stars">1 star</div>
                  <div className="score__bar">
                    <div
                      className={`score__bar__fill score__bar__fill--1 score__${checkRate(
                        props.dataRate?.one_star
                      )}`}
                    />
                  </div>
                  <div className="score__number">
                    ({props.dataRate?.one_star || 0})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default TrustPilotStartOnListItem;
