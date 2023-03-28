import { withAmastyPageState } from '@extensions/bed-kingdom/hoc/amasty-page/withAmastyPageState';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const AmastyLandingPageBreadcrumbs = combineHOC(withAmastyPageState)(
  (props) => {
    return (
      <>
        <section className="breadcrumb-bg container mx-auto md:px-4">
          <ul className="breadcrumb-list">
            <li>
              <span onClick={() => props.actions.go('/')}>
                <span className="cursor-pointer">Home</span>
              </span>
            </li>
            {props?.state?.amastyPage && (
              <li className="ui-breadcrumb_item" style={{ fontWeight: 'bold' }}>
                <span>{props?.state?.amastyPage['title']}</span>
              </li>
            )}
          </ul>
        </section>
      </>
    );
  }
);

export default AmastyLandingPageBreadcrumbs;
