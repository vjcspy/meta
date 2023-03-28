import React from 'react';

const ServicesPlaceholder = React.memo(() => {
  return (
    <>
      <section className="b-section_service py-4 mdm:py-3">
        <div className="container mx-auto md:px-4">
          <div className="service_wrap grid grid-cols-4 gap-2 md:gap-3 lg:gap-4">
            <div className="services-item h-55px w-full animate-pulse bg-gray-300 md:flex md:items-center" />
            <div className="services-item h-55px w-full animate-pulse bg-gray-300 md:flex md:items-center" />
            <div className="services-item h-55px w-full animate-pulse bg-gray-300 md:flex md:items-center" />
            <div className="services-item h-55px w-full animate-pulse bg-gray-300 md:flex md:items-center" />
          </div>
        </div>
      </section>
    </>
  );
});

export default ServicesPlaceholder;
