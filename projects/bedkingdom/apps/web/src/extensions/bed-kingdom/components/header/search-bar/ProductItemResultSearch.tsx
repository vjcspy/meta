import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { useImageSizeBaseOnCfg } from '@modules/ui/hook/useImageSizeBaseOnCfg';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const ProductItemResultSearch = combineHOC(withRouterWithStoreActions)(
  // eslint-disable-next-line react/display-name
  React.memo((props) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const imgSrc = isMobile
      ? props.product?.bed_data?.bed_category_product_image[0]?.url_mobile
      : props.product?.bed_data?.bed_category_product_image[0]?.url;

    const mediaRef = useRef<any>();

    const currentWidth = useMemo(() => {
      return mediaRef?.current?.offsetWidth;
    }, [mediaRef.current]);

    const { width, height } = useImageSizeBaseOnCfg(
      ['product', 'default_image_w_h'],
      undefined,
      currentWidth,
      undefined
    );

    return (
      <>
        <div className="b-search__image" ref={mediaRef}>
          <div onClick={() => props.go(props.product?.url_key + '.html')}>
            <UiExtension
              uiId="IMAGE"
              label={
                props.product?.bed_data?.bed_category_product_image[0]?.label ||
                ''
              }
              width={width}
              height={height}
              src={imgSrc}
            />
          </div>
        </div>
        <div className="b-search__info">
          <div
            className="b-search__name"
            onClick={() => props.go(props.product?.url_key + '.html')}
          >
            {props.product?.name}
          </div>
          <div className="b-search__price">
            <div className="flex items-center justify-between">
              <div className="price-container">
                <UiExtension
                  uiId="PRICE"
                  priceRange={props.product.price_range}
                />
              </div>
              <div className="productList__trustpilot">
                <div className="trustpilot-widget">
                  <div className="productList__stars">
                    <div className="tp-widget-stars">
                      <UiExtension
                        uiId="BEDKINGDOM_TRUST_PILOT_START_SINGLE"
                        star={
                          Math.round(
                            props.product?.bed_data
                              ?.trustpilot_product_reviews_summary
                              ?.stars_average
                          ) || 0
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {!!props.product?.price_range?.minimum_price?.discount
              ?.amount_off && (
              <div className="price-final_price">
                or{' '}
                <span className="text-blue">
                  <UiExtension
                    uiId="CURRENCY"
                    price={
                      props.product?.price_range?.minimum_price?.discount
                        ?.amount_off
                    }
                  />
                </span>{' '}
                a month from{' '}
                {Math.round(
                  props.product?.price_range?.minimum_price?.discount
                    ?.percent_off
                )}
                % APR
              </div>
            )}
          </div>
        </div>
      </>
    );
  })
);

export default ProductItemResultSearch;
