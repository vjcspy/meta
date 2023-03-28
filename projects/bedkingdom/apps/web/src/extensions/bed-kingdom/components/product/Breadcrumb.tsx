import { combineHOC } from '@web/ui-extension';
import React from 'react';

const Breadcrumb = combineHOC()((props) => {
  return (
    <section className="breadcrumb-bg">
      <div className="container mx-auto md:px-4">
        <ul className="breadcrumb-list">
          <li>
            <a href="/">
              <span>Home</span>
            </a>
          </li>
          <li>
            <span>Kids Beds</span>
          </li>
        </ul>
      </div>
    </section>
  );
});

export default Breadcrumb;
