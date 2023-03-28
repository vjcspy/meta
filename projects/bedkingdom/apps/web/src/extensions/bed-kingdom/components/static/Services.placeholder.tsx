import React from 'react';

const ServicesPlaceholder = React.memo(() => {
  return (
    <>
      <section className="b-section_service pt-4 pb-4  mdm:pt-3 mdm:pb-3">
        <div className="container mx-auto md:px-4">
          <div className="service_wrap grid gap-2 md:gap-3 lg:gap-4 grid-cols-4">
            <div className="services-item md:flex md:items-center h-55px animate-pulse w-full bg-gray-300" />
            <div className="services-item md:flex md:items-center h-55px animate-pulse w-full bg-gray-300" />
            <div className="services-item md:flex md:items-center h-55px animate-pulse w-full bg-gray-300" />
            <div className="services-item md:flex md:items-center h-55px animate-pulse w-full bg-gray-300" />
          </div>
        </div>
      </section>
    </>
  );
});

export default ServicesPlaceholder;
