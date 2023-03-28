import { withBrandDetailState } from '@extensions/bed-kingdom/hoc/brand/withBrandDetailState';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const BrandDetailBreadcrumbs = combineHOC(withBrandDetailState)((props) => {
  return (
    <>
      <section className="breadcrumb-bg container mx-auto md:px-4">
        <ul className="breadcrumb-list">
          <li>
            <span onClick={() => props.actions.go('/')}>
              <span className="cursor-pointer">Home</span>
            </span>
          </li>
          {props?.state?.brandDetail && (
            <li className="ui-breadcrumb_item" style={{ fontWeight: 'bold' }}>
              <span>{props?.state?.brandDetail['label']}</span>
            </li>
          )}
        </ul>
      </section>
    </>
  );
});

export default BrandDetailBreadcrumbs;
