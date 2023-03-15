// import Swiper core and required modules
// Import Swiper styles
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import 'swiper/scss/effect-fade';

import { useWindowDimensions } from '@web/base/dist/hook/useWindowDimensions';
import { UiExtension } from '@web/ui-extension';
import React from 'react';
import { A11y, Autoplay, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SimpleSlider(props: {
  images: string[];
  ratio: number;
}) {
  const { width } = useWindowDimensions();

  return (
    <Swiper
      // install Swiper modules
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 5000 }}
      // navigation
      pagination={{ clickable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      effect="fade"
    >
      {props?.images.map((src, index) => (
        <SwiperSlide key={index}>
          <UiExtension
            uiId="IMAGE"
            src={src}
            width={width}
            ratio={props.ratio}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
