import { withProductRewriteUrl } from '@main/packages-web-storefront/src/modules/catalog/hoc/withProductRewriteUrl';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import * as React from 'react';
import { useCallback, useMemo, useState } from 'react';
import Slider from 'react-slick';
const settings = {
  className: 'item_wrapper glass-product-card__image-wrapper',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  adaptiveHeight: true,
  swipeToSlide: true,
  afterChange: function (index: any) {
    console.log(
      `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
    );
  },
};
const ProductListingItemSimple = combineHOC(withProductRewriteUrl)(
  (props: any) => {
    const goProductDetail = useCallback(() => {
      alert('Chưa có tính năng này ở bản xem trước');
      // if (typeof props.actions.goProductRewriteUrl === 'function') {
      //   props.actions.goProductRewriteUrl();
      // }
    }, []);

    const [productImg, setProductImg] = useState(props.product.small_image.url);

    const SimplePrice = useMemo(() => {
      if (props.product?.price_range?.minimum_price?.discount?.amount_off > 0) {
        return (
          <div className="gl-price gl-price--inline">
            {/* Case discount */}
            <div className="gl-price gl-price--horizontal gl-price--inline">
              <div className="gl-price-item gl-price-item--sale gl-price-item--small">
                <UiExtension
                  uiId="CURRENCY"
                  price={
                    props.product?.price_range?.minimum_price?.final_price
                      ?.value
                  }
                />
              </div>
              <div className="gl-price-item gl-price-item--crossed gl-price-item--small notranslate">
                <UiExtension
                  uiId="CURRENCY"
                  price={
                    props.product?.price_range?.minimum_price?.regular_price
                      ?.value
                  }
                />
              </div>
            </div>
            <span className="discount gl-price-item--small">
              (-
              {props.product?.price_range?.minimum_price?.discount?.percent_off?.toFixed(
                0
              )}{' '}
              %)
            </span>
            {/*End Case discount*/}
          </div>
        );
      } else {
        return (
          <div className="gl-price gl-price--inline">
            {/* Case Normal */}
            <div className="gl-price-item gl-price-item--small notranslate">
              <UiExtension
                uiId="PRICE"
                priceRange={props.product.price_range}
              />
              {/*{`${props.product.price.regularPrice.amount.value} ${props.product.price.regularPrice.amount.currency}`}*/}
            </div>
          </div>
        );
      }
    }, [props?.product?.id]);

    return (
      <>
        <div className="gl-product__image">
          <div onClick={() => goProductDetail()}>
            <UiExtension
              uiId="IMAGE"
              classes={{
                image: 'product-img',
              }}
              displayPlaceholder={true}
              src={productImg}
              width="250"
              height="310"
            />
          </div>
          <span
            className={clsx(
              'item__wishlist',
              !!props.state?.productInWishlist && 'active',
              !!props.state?.accountState?.loadingState?.loadingWishlist &&
                'loading-wishlist'
            )}
          >
            <svg
              className="gl-icon"
              data-auto-id="wishlist-icon"
              data-di-res-id="90a00d12-b2dc3b95"
              data-di-rand="1603796195908"
            >
              <use href="#wishlist-inactive">
                <svg id="wishlist-inactive" viewBox="0 0 20 24">
                  <title>wishlist-inactive</title>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    d="M7.38 6H4.42L2 10l8 8 8-8-2.41-4h-2.98L10 9 7.38 6z"
                  />
                </svg>
              </use>
            </svg>
          </span>
          {/* product thumb custom them slider em nhe*/}
          <div className="gl-product-card__carousel">
            <div className="gl-slider___thumb">
              <Slider {...settings}>
                {props?.product?.media_gallery?.map((gl: any) => {
                  return (
                    <div
                      className="item_wrapper glass-product-card__image-wrapper"
                      key={gl['url']}
                      onMouseOver={() => setProductImg(gl['url'])}
                      onClick={() => goProductDetail()}
                    >
                      <a>
                        <img
                          src={gl['url']}
                          alt=""
                          className="img_with_fallback"
                        />
                      </a>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
          {/* end product thumb custom them slider em nhe*/}
        </div>

        <div className="gl-product__info" onClick={() => goProductDetail()}>
          <h3 className="gl-product__name">{props.product.name}</h3>
          <div className="gl-product__brand">{props.product.sku}</div>
          {SimplePrice}
        </div>
      </>
    );
  }
);

export default ProductListingItemSimple;
