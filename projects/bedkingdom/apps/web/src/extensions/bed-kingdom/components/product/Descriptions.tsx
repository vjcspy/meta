import { withBedkingomMostviewedGroups } from '@extensions/bed-kingdom/hoc/product/withBedkingdomMostviewedGroups';
import { SLIDER_PRODUCT_VIEWED_HORIZONTAL_ITEM_HOME } from '@extensions/bed-kingdom/values/BED_KINGDOM_SETTING_SLIDER';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';
import Slider from 'react-slick';

const Descriptions = combineHOC(withBedkingomMostviewedGroups)((props) => {
  const SLIDER = useMemo(() => {
    return (
      <>
        {Array.isArray(props?.state?.listMostViewed) &&
          props?.state?.listMostViewed.length > 3 && (
            <div className="b-listingTab__content">
              <Slider {...SLIDER_PRODUCT_VIEWED_HORIZONTAL_ITEM_HOME}>
                {props?.state?.listMostViewed.map((product: any) => (
                  <UiExtension
                    uiId="BEDKINGDOM_PRODUCT_LISTING_ITEM"
                    product={product}
                    key={product.uid}
                  />
                ))}
              </Slider>
            </div>
          )}
      </>
    );
  }, [props?.state?.listMostViewed]);
  return (
    <UiExtension uiId="ONLY_DESKTOP">
      <div className="b-product-infos">
        <UiExtension uiId="PRODUCT_DETAIL" />
        <UiExtension uiId="PRODUCT_MORE_INFORMATION" />
        <UiExtension uiId="PRODUCT_CUSTOMER_QUESTION" />
        <UiExtension uiId="PRODUCT_REVIEW" />
        <UiExtension uiId="PRODUCT_OFFERS" />
        {Array.isArray(props?.state?.listMostViewed) &&
          props?.state?.listMostViewed.length > 0 && (
            <>
              {props?.state?.listMostViewed.length > 3 ? (
                <>
                  <h3 className="text-18px md:text-26px font-bold mt-5 md:mt-7 mb-5">
                    Who Bought This Also Bought
                  </h3>
                  {SLIDER}
                </>
              ) : (
                <div className="">
                  <h3 className="text-18px md:text-26px font-bold mt-5 md:mt-7 mb-5">
                    Who Bought This Also Bought
                  </h3>
                  <div className="grid md:grid-cols-2 md:grid-cols-3 gap-5">
                    {Array.isArray(props?.state?.listMostViewed) &&
                      props?.state?.listMostViewed.map((product: any) => (
                        <UiExtension
                          uiId="PRODUCT_LISTING_ITEM"
                          product={product}
                          key={product.uid}
                        />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
      </div>
    </UiExtension>
  );
});

export default Descriptions;
