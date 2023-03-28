import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const NotFound = combineHOC()(() => {
  return (
    <>
      <section className="container mx-auto">
        <div className="page-404 text-center">
          <h1 className="page-404-title text-36px uppercase text-color-428bff">
            404
          </h1>
          <div className="page-404-des mt-4 mb-10">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
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
