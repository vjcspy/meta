import { withStringSearchData } from '@modules/catalog/hoc/withStringSearchData';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const BreadCrumbsForSearch = combineHOC(
    withRouterWithStoreActions,
  withStringSearchData
)((props) => {
  return (
    <>
      <section className="breadcrumb-bg container mx-auto md:px-4">
        <ul className="breadcrumb-list">
          <li>
            <span onClick={() => props.actions.go('/')}>
              <span>Home</span>
            </span>
          </li>
          <li key="category_id" className="ui-breadcrumb_item cursor-pointer">
            <span>{`SEARCH RESULTS FOR: "${
              props?.state?.searchString ?? ''
            }"`}</span>
          </li>
        </ul>
      </section>
      <section className="b-content__listing container mx-auto md:px-4">
        <div className="b-category-info">
          <div className="b-category-description">
            <div className="flex justify-between">
              <div className="col-des col-des">
                <h1 className="b-category-name">{`SEARCH RESULTS FOR: "${
                  props?.state?.searchString ?? ''
                }"`}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

export default BreadCrumbsForSearch;
