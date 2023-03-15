import { useTranslation } from '@main/packages-web-i18n';
import { withCategoryData } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withCategoryData';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

export default combineHOC(
  withCategoryData,
  withRouterWithStoreActions
)(function BreadCrumbs(props) {
  const { t } = useTranslation();
  if (!props.category) {
    return null;
  }
  return (
    <div className="ui-breadcrumb">
      <div className="ui-back__btn" onClick={() => props.actions.back()}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.5 3.5L5 8L9.5 12.5"
            stroke="#181E3B"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="back-name">{t('back')}</span>
        <span className="back-icon">
          <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.5" cy="2.5" r="2.5" fill="#C5CCE2" />
          </svg>
        </span>
      </div>
      <ul className="ui-breadcrumb_list">
        <li className="ui-breadcrumb_item">
          <a href="#" onClick={() => props.actions.go('')}>{t('home')}</a>
        </li>
        {Array.isArray(props.category.breadcrumbs) &&
          props.category.breadcrumbs.map((b: any) => {
            let path = b['path'] ?? '';
            if (path.charAt(0) === '/') {
              path = path.substring(1);
            }
            return (
              <li key={b['category_id']} className="ui-breadcrumb_item">
                <a href="#" onClick={() => props.actions.go(path)}>
                  {b['category_name']}
                </a>
              </li>
            );
          })}
        <li className="ui-breadcrumb_item">
          <span>{props.category['name']}</span>
        </li>
      </ul>
    </div>
  );
});
