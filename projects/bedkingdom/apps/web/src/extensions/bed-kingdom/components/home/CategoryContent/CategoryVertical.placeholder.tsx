import React from 'react';

const CategoryVerticalPlaceholder = React.memo((props) => {
  return (
    <>
      {' '}
      <section className="b-section__categoryTabs">
        <div className="container mx-auto md:px-4">
          <div className="b-categoryRole__main">
            <div className="b-categoryRole__side">
              <div className="animate-pulse bg-gray-300 w-full min-h-92 mb-4" />
              <div className="animate-pulse bg-gray-300 w-full min-h-92 mb-4" />
              <div className="animate-pulse bg-gray-300 w-full min-h-92 mb-4" />
              <div className="animate-pulse bg-gray-300 w-full min-h-92 mb-4" />
              <div className="animate-pulse bg-gray-300 w-full min-h-92 mb-4" />
            </div>
            <div className="b-listingTab__content">
              <div className="grid grid-cols-3 gap-4 mb-7">
                <div className="w-full min-h-362 animate-pulse bg-gray-300 rounded" />
                <div className="w-full min-h-362 animate-pulse bg-gray-300 rounded" />
                <div className="w-full min-h-362 animate-pulse bg-gray-300 rounded" />
              </div>
              <div className="m-auto w-210px h-44 animate-pulse bg-gray-300 rounded mt-13" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
});

CategoryVerticalPlaceholder.displayName = 'CategoryVerticalPlaceholder';
export default CategoryVerticalPlaceholder;
