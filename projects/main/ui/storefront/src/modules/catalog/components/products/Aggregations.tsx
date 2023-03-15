import { SortEnum } from '@main/packages-web-apollo-schema-mgt';
import { useTranslation } from '@main/packages-web-i18n';
import { withProductContainerActions } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withProductContainerActions';
import { withProductsState } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withProductsState';
import { withStoreAggregationsData } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withStoreAggregationsData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

export default combineHOC(
  withStoreAggregationsData,
  withProductContainerActions,
  withProductsState
)(function Aggregations(props) {
  const [showMoreFilter, setShowMoreFilter] = useState(false);
  const [isMoreFilter, setIsMoreFilter] = useState(false);
  const { t } = useTranslation('catalog');
  const [sortValue, _setSortValue] = useState('position_DES');
  const setSorter = useCallback((sort: any) => {
    if (typeof props.actions?.setFilterInfo === 'function') {
      props.actions.setFilterInfo({
        sort,
      });
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(props.aggregations) && props.aggregations.length > 9) {
      setShowMoreFilter(true);
    }
  }, [props.aggregations]);

  useEffect(() => {
    switch (sortValue) {
      case 'position_DES':
        return setSorter({
          position: SortEnum.Desc,
        });
      case 'position_ASC':
        return setSorter({
          position: SortEnum.Asc,
        });
      case 'price_DESC':
        return setSorter({
          price: SortEnum.Desc,
        });
      case 'price_ASC':
        return setSorter({
          price: SortEnum.Asc,
        });
      case 'name_DES':
        return setSorter({
          name: SortEnum.Desc,
        });
      case 'name_ASC':
        return setSorter({
          name: SortEnum.Asc,
        });
    }
  }, [sortValue]);

  if (
    !props.products ||
    (Array.isArray(props.products) && props.products.length === 0)
  ) {
    return null;
  }

  return (
    <div className="ui-horizontal-bar__content">
      <div className="ui-aggregation d-sm-flex justify-content-between">
        <div
          className={clsx(
            'ui-aggregation__list',
            isMoreFilter && 'ui-filters-more'
          )}
        >
          {props.aggregations
            .filter((a: any) => a?.attribute_code !== 'category_uid')
            .map((aggregation: any) => (
              <UiExtension
                uiId="PRODUCTS_AGGREGATION"
                key={aggregation.attribute_code}
                attributeCode={aggregation.attribute_code}
                aggregation={aggregation}
              />
            ))}
        </div>
        <div className="ui-form__filter">
          {showMoreFilter && (
            <div
              className="wrapper___more"
              onClick={() => setIsMoreFilter(!isMoreFilter)}
            >
              <a  href="#" className="collapse-controller">
                <span className="gl-label gl-label--l">
                  {isMoreFilter ? t('less_filters') : t('more_filters')}
                </span>
                <svg className="gl-icon icon">
                  <use href="#plus">
                    <svg id="plus" viewBox="0 0 20 24">
                      <title>plus</title>
                      <path
                        d="M10 2v20m10-10H0"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      />
                    </svg>
                  </use>
                </svg>
              </a>
            </div>
          )}

          {/*<div className="gl-dropdown-custom__options">*/}
          {/*  <select*/}
          {/*    className="gl-dropdown-custom__select-element border-none poiter"*/}
          {/*    value={sortValue}*/}
          {/*    onChange={(event) => setSortValue(event.target.value)}*/}
          {/*  >*/}
          {/*    <option value="price_DESC">{t('price_DESC')}</option>*/}
          {/*    <option value="price_ASC">{t('price_ASC')}</option>*/}
          {/*    <option value="position_DES">{t('position_DES')}</option>*/}
          {/*    <option value="position_ASC">{t('position_ASC')}</option>*/}
          {/*    <option value="name_DES">{t('name_DES')}</option>*/}
          {/*    <option value="name_ASC">{t('name_ASC')}</option>*/}
          {/*  </select>*/}
          {/*</div>*/}

          {/*<div className="ui-select-size d-flex align-items-center">*/}
          {/*  <svg*/}
          {/*    width="16"*/}
          {/*    height="16"*/}
          {/*    viewBox="0 0 16 16"*/}
          {/*    fill="none"*/}
          {/*    xmlns="http://www.w3.org/2000/svg"*/}
          {/*  >*/}
          {/*    <path*/}
          {/*      d="M8 0C3.6 0 0 3.6 0 8C0 12.4 3.6 16 8 16C12.4 16 16 12.4 16 8C16 3.6 12.4 0 8 0ZM9 12H7V7H9V12ZM8 6C7.4 6 7 5.6 7 5C7 4.4 7.4 4 8 4C8.6 4 9 4.4 9 5C9 5.6 8.6 6 8 6Z"*/}
          {/*      fill="#181E3B"*/}
          {/*    />*/}
          {/*  </svg>*/}
          {/*  <span className="pl-2">Hướng dẫn chọn cỡ</span>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
});
