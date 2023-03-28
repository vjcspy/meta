import { UiExtension } from '@web/ui-extension';
import React from 'react';

const ContentProductItemLabel: React.FC<{
  product: any;
  actionGo: (s: string) => void;
}> = (props) => {
  return (
    <div className="b-product__info">
      <UiExtension uiId="ONLY_MOBILE">
        <UiExtension
          uiId="BEDKINGDOM_CONTENT_PRODUCT_ITEM_LABEL"
          product={props.product}
        />
      </UiExtension>
      <div
        className="productList__title"
        onClick={() => {
          props?.product?.bed_data?.gtm_tag_click;
        }}
      >
        <span onClick={() => props.actionGo(props.product?.url_key + '.html')}>
          {props.product?.name}
        </span>
      </div>
      <div className="productList__reviews">
        <UiExtension
          uiId="BEDKINGDOM_TRUST_PILOT_START_ON_LIST_ITEM"
          dataRate={props.product?.bed_data?.trustpilot_product_reviews_summary}
        />
      </div>

      <div className="productList__price">
        <UiExtension uiId="PRICE" priceRange={props.product.price_range} />
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
  );
};

export default ContentProductItemLabel;
