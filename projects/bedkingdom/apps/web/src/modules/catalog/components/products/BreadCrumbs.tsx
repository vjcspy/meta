import { withBedKingdomCategoryData } from '@extensions/bed-kingdom/hoc/products/withBedKingdomCategoryData';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const BreadCrumbs = combineHOC(
  withBedKingdomCategoryData,
    withRouterWithStoreActions
)((props) => {
  if (!props.category) {
    return null;
  }
  return (
    <section className="breadcrumb-bg container mx-auto md:px-4">
      <ul className="breadcrumb-list">
        <li>
          <span onClick={() => props.actions.go('/')}>
            <span className="cursor-pointer">Home</span>
          </span>
        </li>
        {Array.isArray(props.category?.breadcrumbs) &&
          props.category?.breadcrumbs?.map((b: any) => {
            let path = b['path'] ?? '';
            if (path.charAt(0) === '/') {
              path = path.substring(1);
            }
            return (
              <li
                key={b['category_id']}
                className="ui-breadcrumb_item cursor-pointer"
              >
                <span onClick={() => props.actions.go(path)}>
                  {b['category_name']}
                </span>
              </li>
            );
          })}
        <li className="ui-breadcrumb_item">
          <span>{props?.category['name']}</span>
        </li>
      </ul>
    </section>
  );
});

export default BreadCrumbs;
