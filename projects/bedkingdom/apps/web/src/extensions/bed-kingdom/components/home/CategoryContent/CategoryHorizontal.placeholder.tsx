import React from 'react';

const CategoryHorizontalPlaceholder = React.memo(() => {
  return (
    <>
      <section className="b-section__productTabs" style={{ paddingTop: 35 }}>
        <div className="container mx-auto md:px-4">
          <div className="max-w-780 w-full m-auto h-58px animate-pulse w-full bg-gray-300" />
          <div className="grid grid-cols-4 gap-4 mt-7 mb-7">
            <div className="w-full min-h-362 animate-pulse bg-gray-300 rounded" />
            <div className="w-full min-h-362 animate-pulse bg-gray-300 rounded" />
            <div className="w-full min-h-362 animate-pulse bg-gray-300 rounded" />
            <div className="w-full min-h-362 animate-pulse bg-gray-300 rounded" />
          </div>
        </div>
      </section>
    </>
  );
});

CategoryHorizontalPlaceholder.displayName = 'CategoryHorizontalPlaceholder';
export default CategoryHorizontalPlaceholder;
