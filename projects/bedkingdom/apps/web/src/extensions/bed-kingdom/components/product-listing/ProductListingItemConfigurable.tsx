import { SLIDER_IMAGE_SWATCHES } from '@extensions/bed-kingdom/values/BED_KINGDOM_SETTING_SLIDER';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';

const ProductListingItemConfigurable: React.FC<{ product: any }> = combineHOC(
  withRouterWithStoreActions
)((props) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [showSwatches, setShowSwatches] = useState(true);

  const imgSrc = isMobile
    ? props.product?.bed_data?.bed_category_product_image[0]?.url_mobile
    : props.product?.bed_data?.bed_category_product_image[0]?.url;
  const [productImg, setProductImg] = useState(imgSrc);

  const go = useCallback((url: string) => {
    if (props.actions.go) {
      props.actions.go(url);
    }
  }, []);

  const mediaRef = useRef<any>();

  const productChildren = useMemo(() => {
    const newVariants: any = [];
    const valueColor: any = [];
    const valueColorAdded: any = [];
    if (props.product?.variants && props.product?.variants?.length > 0) {
      props.product?.variants.forEach((item: any) => {
        if (
          Array.isArray(item?.attributes) &&
          item?.attributes.length > 0 &&
          valueColor.length === 0
        ) {
          const checkedItem = item?.attributes.find(
            (it: any) => it.code === 'color'
          );

          if (
            checkedItem &&
            checkedItem?.uid &&
            !valueColorAdded.includes(checkedItem?.uid)
          ) {
            valueColorAdded.push(checkedItem?.uid);
            newVariants.push(item);
          }
        }
      });

      if (newVariants.length === 0) {
        setShowSwatches(false);
      }

      return (
        <div className="b--swatches-container">
          <div className="b--swatches-swatch-wrapper b--swatches-swatch-visible">
            <div className="b--swatches-swatch">
              {newVariants.length > 5 ? (
                <Slider {...SLIDER_IMAGE_SWATCHES}>
                  {newVariants
                    .filter(
                      (check: any) =>
                        check?.product?.bed_data?.bed_category_product_image[0]
                          ?.url && check?.attributes[0]?.label
                    )
                    ?.map((it: any) => {
                      const itImage = isMobile
                        ? it?.product?.bed_data?.bed_category_product_image[0]
                            ?.url_mobile
                        : it?.product?.bed_data?.bed_category_product_image[0]
                            ?.url;
                      return (
                        <div
                          title={
                            it?.product?.bed_data?.bed_category_product_image[0]
                              ?.label || ''
                          }
                          className={`b--swatches-swatch-inner b--swatches-items ${
                            it?.product?.stock_status === 'OUT_OF_STOCK' &&
                            'swatch-is-out-stock'
                          }`}
                          key={it?.product?.uid}
                          onMouseOver={() => {
                            setProductImg(itImage);
                          }}
                          onMouseOut={() => {
                            setProductImg(imgSrc);
                          }}
                          onClick={() => go(props.product?.url_key + '.html')}
                        >
                          <span
                            style={{
                              backgroundImage: `url(${itImage})`,
                            }}
                          ></span>
                        </div>
                      );
                    })}
                </Slider>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  {newVariants
                    .filter(
                      (check: any) =>
                        check?.product?.bed_data?.bed_category_product_image[0]
                          ?.url && check?.attributes[0]?.label
                    )
                    ?.map((it: any) => {
                      const itImage = isMobile
                        ? it?.product?.bed_data?.bed_category_product_image[0]
                            ?.url_mobile
                        : it?.product?.bed_data?.bed_category_product_image[0]
                            ?.url;
                      return (
                        <div
                          title={
                            it?.product?.bed_data?.bed_category_product_image[0]
                              ?.label || ''
                          }
                          className={`b--swatches-swatch-inner b--swatches-items ${
                            it?.product?.stock_status === 'OUT_OF_STOCK' &&
                            'swatch-is-out-stock'
                          }`}
                          key={it?.product?.uid}
                          onMouseOver={() => {
                            setProductImg(itImage);
                          }}
                          onMouseOut={() => {
                            setProductImg(imgSrc);
                          }}
                          onClick={() => go(props.product?.url_key + '.html')}
                        >
                          <span
                            style={{
                              backgroundImage: `url(${itImage})`,
                            }}
                          ></span>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
    return null;
  }, [props.product?.variants]);

  return (
    <div
      className="b-product__item text-center"
      // onMouseEnter={() => {
      //   setShowSwatches(true);
      // }}
      // onMouseLeave={() => {
      //   setShowSwatches(false);
      // }}
      onClick={() => {
        props?.product?.bed_data?.gtm_tag_click;
      }}
    >
      <div className="b-product__media" ref={mediaRef}>
        <div
          title={props.product?.title ?? ''}
          className="b-product-image"
          onClick={() => go(props.product?.url_key + '.html')}
          style={{
            backgroundImage: `url(${productImg})`,
          }}
        >
          <UiExtension
            uiId="BEDKINGDOM_CONTENT_PRODUCT_ITEM_LABEL"
            product={props.product}
          />
        </div>
        {showSwatches && productChildren}
      </div>
      <UiExtension
        uiId="BEDKINGDOM_CONTENT_PRODUCT_ITEM_INFO"
        product={props.product}
        actionGo={go}
      />
    </div>
  );
});

export default ProductListingItemConfigurable;
