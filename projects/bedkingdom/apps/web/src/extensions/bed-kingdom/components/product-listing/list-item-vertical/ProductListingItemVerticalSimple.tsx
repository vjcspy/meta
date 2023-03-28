import { useImageSizeBaseOnCfg } from '@modules/ui/hook/useImageSizeBaseOnCfg';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';

const ProductListingItemVerticalSimple: React.FC<{ product: any }> = combineHOC(
    withRouterWithStoreActions
)((props) => {
  const [showDes, setShowDes] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const imgSrc = isMobile
    ? props.product?.bed_data?.bed_category_product_image[0]?.url_mobile
    : props.product?.bed_data?.bed_category_product_image[0]?.url;
  const go = useCallback((url: string) => {
    if (props.actions.go) {
      props.actions.go(url);
    }
  }, []);

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
    <div className="b-product__item pb-0">
      <div className="b-product__itemList flex flex-wrap">
        <div className="item-left">
          <div
            title="Flair Furnishings Ollie Triple Bunk Bed"
            className="relative block"
            onClick={() => go(props.product?.url_key + '.html')}
          >
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
            <UiExtension
              uiId="BEDKINGDOM_CONTENT_PRODUCT_ITEM_LABEL"
              product={props.product}
            />
          </div>
        </div>
        <div className="item-content">
          <div className="b-product__info text-left">
            <div className="productList__title text-16px lg:text-18px mb-2">
              <span onClick={() => go(props.product?.url_key + '.html')}>
                {props.product?.name}
              </span>
            </div>
            <div
              className={`productList-des text-justify md:block hidden text-color-666 ${
                showDes && 'active'
              }`}
              dangerouslySetInnerHTML={{
                __html: props.product?.description?.html,
              }}
            />
            <p
              className="productList-more text-color-2362AA font-bold md:block hidden cursor-pointer pt-3"
              onClick={() => setShowDes(!showDes)}
            >
              {showDes ? '+ ReadLess' : '+ ReadMore'}
            </p>
          </div>
          {isMobile && (
            <div className="item-right">
              <div className="productList-info">
                {/*//Cho nay add trustpilot*/}
                <UiExtension
                  uiId="BEDKINGDOM_TRUST_PILOT_START_ON_LIST_ITEM"
                  dataRate={
                    props.product?.bed_data?.trustpilot_product_reviews_summary
                  }
                />
                <div className="productList__price">
                  <UiExtension
                    uiId="PRICE"
                    priceRange={props.product.price_range}
                  />
                </div>
                <div className="productList__text">
                  {!!props.product?.bed_data?.finance_price && (
                    <div className="productList__price price-nomal">
                      or{' '}
                      <span className="text-blue">
                        <UiExtension
                          uiId="CURRENCY"
                          price={props.product?.bed_data?.finance_price}
                        />
                      </span>{' '}
                      a month from 0 % APR
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="item-right">
            <div className="productList-info">
              {/*//Cho nay add trustpilot*/}
              <UiExtension
                uiId="BEDKINGDOM_TRUST_PILOT_START_ON_LIST_ITEM"
                dataRate={
                  props.product?.bed_data?.trustpilot_product_reviews_summary
                }
              />
              <div className="productList__price">
                <UiExtension
                  uiId="PRICE"
                  priceRange={props.product.price_range}
                />
              </div>
              <div className="productList__text">
                {!!props.product?.bed_data?.finance_price && (
                  <div className="productList__price price-nomal">
                    or{' '}
                    <span className="text-blue">
                      <UiExtension
                        uiId="CURRENCY"
                        price={props.product?.bed_data?.finance_price}
                      />
                    </span>{' '}
                    a month from 0 % APR
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default ProductListingItemVerticalSimple;
