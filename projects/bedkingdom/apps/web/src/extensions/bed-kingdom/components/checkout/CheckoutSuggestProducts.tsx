import { combineHOC } from '@web/ui-extension';
import React from 'react';

const CheckoutSuggestProducts: React.FC = combineHOC()((props) => {
  return (
    <div className="b-recently-product mb-10">
      <div className="b-recently-heading text-center text-18px mt-5 mb-5 md:text-22px md:mt-10 md:mb-10">
        <strong>YOU MAY ALSO LIKE...</strong>
      </div>
      <div className="b-recently-content grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="b-product__item text-center">
          <div className="b-product__media">
            <div
              title="LPD Monroe Diamante Dining Chairs Set of 2"
              className="b-product-image"
            >
              <div className="lazyload-wrapper ">
                <img
                  alt=""
                  src="https://admin.magedemo.co.uk/media/catalog/product/cache/b9b8ace502d74c60941f58b16e4c2fb8/o/l/ollie_1.jpg"
                  height={253}
                  width={363}
                />
              </div>
              <div className="b-product__label">
                <div className="b-label b-label-new">New</div>
                <div className="b-label b-label-delivery">
                  <span>Next Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
          <div className="b-product__info">
            <div className="productList__title">
              <span>Flair Furnishings Ollie Triple Bunk Bed</span>
            </div>
            <div className="productList__price">
              <strong className="text-blue"> £379.99</strong>&nbsp;
            </div>
          </div>
        </div>
        <div className="b-product__item text-center">
          <div className="b-product__media">
            <div
              title="LPD Monroe Diamante Dining Chairs Set of 2"
              className="b-product-image"
            >
              <div className="lazyload-wrapper ">
                <img
                  alt=""
                  src="https://admin.magedemo.co.uk/media/catalog/product/cache/b9b8ace502d74c60941f58b16e4c2fb8/o/l/ollie_1.jpg"
                  height={253}
                  width={363}
                />
              </div>
              <div className="b-product__label">
                <div className="b-label b-label-new">New</div>
                <div className="b-label b-label-delivery">
                  <span>Next Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
          <div className="b-product__info">
            <div className="productList__title">
              <span>Flair Furnishings Ollie Triple Bunk Bed</span>
            </div>
            <div className="productList__price">
              <strong className="text-blue"> £379.99</strong>&nbsp;
            </div>
          </div>
        </div>
        <div className="b-product__item text-center">
          <div className="b-product__media">
            <div
              title="LPD Monroe Diamante Dining Chairs Set of 2"
              className="b-product-image"
            >
              <div className="lazyload-wrapper ">
                <img
                  alt=""
                  src="https://admin.magedemo.co.uk/media/catalog/product/cache/b9b8ace502d74c60941f58b16e4c2fb8/o/l/ollie_1.jpg"
                  height={253}
                  width={363}
                />
              </div>
              <div className="b-product__label">
                <div className="b-label b-label-new">New</div>
                <div className="b-label b-label-delivery">
                  <span>Next Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
          <div className="b-product__info">
            <div className="productList__title">
              <span>Flair Furnishings Ollie Triple Bunk Bed</span>
            </div>
            <div className="productList__price">
              <strong className="text-blue"> £379.99</strong>&nbsp;
            </div>
          </div>
        </div>
        <div className="b-product__item text-center">
          <div className="b-product__media">
            <div
              title="LPD Monroe Diamante Dining Chairs Set of 2"
              className="b-product-image"
            >
              <div className="lazyload-wrapper ">
                <img
                  alt=""
                  src="https://admin.magedemo.co.uk/media/catalog/product/cache/b9b8ace502d74c60941f58b16e4c2fb8/o/l/ollie_1.jpg"
                  height={253}
                  width={363}
                />
              </div>
              <div className="b-product__label">
                <div className="b-label b-label-new">New</div>
                <div className="b-label b-label-delivery">
                  <span>Next Day Delivery</span>
                </div>
              </div>
            </div>
          </div>
          <div className="b-product__info">
            <div className="productList__title">
              <span>Flair Furnishings Ollie Triple Bunk Bed</span>
            </div>
            <div className="productList__price">
              <strong className="text-blue"> £379.99</strong>&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CheckoutSuggestProducts;
