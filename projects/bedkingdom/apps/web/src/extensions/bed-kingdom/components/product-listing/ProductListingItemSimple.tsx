import { useImageSizeBaseOnCfg } from '@modules/ui/hook/useImageSizeBaseOnCfg';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useMemo, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const ProductListingItemSimple: React.FC<{ product: any }> = combineHOC(
    withRouterWithStoreActions
)((props) => {
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
    <div
      className="b-product__item text-center"
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
            backgroundImage: `url(${imgSrc})`,
          }}
        >
          <UiExtension
            uiId="BEDKINGDOM_CONTENT_PRODUCT_ITEM_LABEL"
            product={props.product}
          />
        </div>
      </div>
      <UiExtension
        uiId="BEDKINGDOM_CONTENT_PRODUCT_ITEM_INFO"
        product={props.product}
        actionGo={go}
      />
    </div>
  );
});

export default ProductListingItemSimple;
