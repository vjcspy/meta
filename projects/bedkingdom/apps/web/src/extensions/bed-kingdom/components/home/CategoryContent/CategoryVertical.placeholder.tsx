import React from 'react';

const CategoryVerticalPlaceholder = React.memo(() => {
  return (
    <>
      {' '}
      <section className="b-section__categoryTabs">
        <div className="container mx-auto md:px-4">
          <div className="b-categoryRole__main">
            <div className="b-categoryRole__side">
              <div className="mb-4 min-h-92 w-full animate-pulse bg-gray-300" />
              <div className="mb-4 min-h-92 w-full animate-pulse bg-gray-300" />
              <div className="mb-4 min-h-92 w-full animate-pulse bg-gray-300" />
              <div className="mb-4 min-h-92 w-full animate-pulse bg-gray-300" />
              <div className="mb-4 min-h-92 w-full animate-pulse bg-gray-300" />
            </div>
            <div className="b-listingTab__content">
              <div className="mb-7 grid grid-cols-3 gap-4">
                <div className="min-h-362 w-full animate-pulse rounded bg-gray-300" />
                <div className="min-h-362 w-full animate-pulse rounded bg-gray-300" />
                <div className="min-h-362 w-full animate-pulse rounded bg-gray-300" />
              </div>
              <div className="mt-13 m-auto h-44 w-210px animate-pulse rounded bg-gray-300" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

CategoryVerticalPlaceholder.displayName = 'CategoryVerticalPlaceholder';
export default CategoryVerticalPlaceholder;
