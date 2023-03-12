import { useTranslation } from '@main/packages-web-i18n';
import { useRouterActions } from '@main/packages-web-storefront/src/modules/router/hook/useRouterActions';
import { UiExtension } from '@web/ui-extension';
import React from 'react';

const AutoComplete = React.memo((props: any) => {
  const {
    message,
    value,
    products,
    categories,
    catLimit = 5,
    prodLimit = 5,
    valid,
  } = props;
  const { t } = useTranslation(['common']);

  const { go } = useRouterActions();
  return (
    <div className="search-bar-auto-complete">
      <span className="search-bar-auto-complete-heading">{message}</span>
      {valid && (
        <div className="ui-grid search-bar-auto-complete-suggestion">
          <div className="ui-col ui-col-first">
            <h3 className="search-bar-auto-complete-heading mb-0 p-0">
              <span>{t('suggestions')}</span>
            </h3>
            <ul className="search-bar-auto-complete-suggestion-category">
              {Array.isArray(categories) &&
                categories.slice(0, catLimit).map((cat) => {
                  return (
                    <li
                      className="search-bar-auto-complete-suggestion-category-item"
                      key={cat.value}
                    >
                      <strong className="search-bar-auto-complete-suggestion-category-item-value">
                        {`${value}`}
                      </strong>
                      <span className="search-bar-auto-complete-suggestion-category-item-label">
                        {` in ${cat.label}`}
                      </span>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="ui-col">
            <h3 className="search-bar-auto-complete-heading mb-1 pt-0">
              <span>{t('products')}</span>
            </h3>
            <ul className="search-bar-auto-complete-suggestion-product">
              {Array.isArray(products) &&
                products.slice(0, prodLimit).map((product) => {
                  return (
                    <li
                      className="search-bar-auto-complete-suggestion-product-item cursor-pointer"
                      key={product.id}
                      onClick={() => go(product['url_key'] + '.html')}
                    >
                      <div className="search-bar-auto-complete-suggestion-product-item-image">
                        <UiExtension
                          uiId="IMAGE"
                          alt={product.name}
                          src={product.small_image.url}
                          height={45}
                        />
                      </div>
                      <div className="search-bar-auto-complete-right">
                        <span className="search-bar-auto-complete-suggestion-product-item-name">
                          <span>{` ${product.name}`}</span>
                        </span>
                        <span className="search-bar-auto-complete-suggestion-product-item-price">
                          <UiExtension
                            uiId="CURRENCY"
                            price={product.price.regularPrice.amount.value}
                          />
                        </span>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
});

export default AutoComplete;
