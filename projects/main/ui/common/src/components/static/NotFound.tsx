import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const NotFound = combineHOC()(() => {
  return (
    <>
      <section className="container mr-auto ml-auto">
        <div className="text-center page-404">
          <h1 className="uppercase text-36px text-color-428bff page-404-title">
            404
          </h1>
          <div className="mt-4 mb-10 page-404-des">
            <strong className="text-16px">There's NOTHING here....</strong>
            <p>You might want to check that URL again or head over to our </p>
            <span
              className="text-color-2362AA"
              onClick={() => {
                RouterSingleton.push('/');
              }}
            >
              Back to home
            </span>
          </div>
        </div>
      </section>
    </>
  );
});

export default NotFound;
