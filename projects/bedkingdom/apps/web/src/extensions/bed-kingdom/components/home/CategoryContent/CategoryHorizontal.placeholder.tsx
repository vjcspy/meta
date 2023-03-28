import React from 'react';

const CategoryHorizontalPlaceholder = React.memo(() => {
  return (
    <>
      <section className="b-section__productTabs" style={{ paddingTop: 35 }}>
        <div className="container mx-auto md:px-4">
          <div className="m-auto h-58px w-full max-w-780 animate-pulse bg-gray-300" />
          <div className="my-7 grid grid-cols-4 gap-4">
            <div className="min-h-362 w-full animate-pulse rounded bg-gray-300" />
            <div className="min-h-362 w-full animate-pulse rounded bg-gray-300" />
            <div className="min-h-362 w-full animate-pulse rounded bg-gray-300" />
            <div className="min-h-362 w-full animate-pulse rounded bg-gray-300" />
          </div>
        </div>
      </section>
    </>
  );
});

CategoryHorizontalPlaceholder.displayName = 'CategoryHorizontalPlaceholder';
export default CategoryHorizontalPlaceholder;
