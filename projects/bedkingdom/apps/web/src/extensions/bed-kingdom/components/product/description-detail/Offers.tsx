import { withOfferProductState } from '@extensions/bed-kingdom/hoc/product/withOfferProductState';
import { combineHOC } from '@web/ui-extension';
import React, { useState } from 'react';

const Offers = combineHOC(withOfferProductState)(
  React.memo((props) => {
    const [showOffers, setShowOffers] = useState(false);

    return (
      <>
        {Array.isArray(props?.state?.listAmMattress) &&
          props?.state?.listAmMattress.length > 0 && (
            <div className="b-product-info b-info-review cursor-pointer">
              <div
                className="b-info-label flex cursor-pointer items-center justify-between"
                onClick={() => {
                  setShowOffers(!showOffers);
                }}
              >
                Offers
                {showOffers ? (
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
              {showOffers && (
                <>
                  <div className={`b-info-content ${showOffers && 'active'}`}>
                    {Array.isArray(props?.state?.listAmMattress) &&
                      props?.state?.listAmMattress.length > 0 &&
                      props?.state?.listAmMattress.map((item: any) => (
                        <div className="b-offers-item flex" key={item?.id}>
                          <div className="b-offers-img max-w-265">
                            <img
                              className="b-offers-photo"
                              data-src={item?.image}
                              width={320}
                              height={320}
                              src={item?.image}
                              alt="Maxitex Magic Memory 250 Mattress"
                            />
                          </div>
                          <div className="b-offers-detail ml-3  md:ml-5 mdm:mt-3">
                            <strong className="mattress-name">
                              <a
                                className="mattress-link mb-2 block text-main-1979c3"
                                href={item?.url}
                              >
                                {item?.name}
                              </a>
                            </strong>
                            <div
                              className="mattress-offer-description hidden md:block"
                              dangerouslySetInnerHTML={{
                                __html: item?.description,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
      </>
    );
  })
);

export default Offers;
