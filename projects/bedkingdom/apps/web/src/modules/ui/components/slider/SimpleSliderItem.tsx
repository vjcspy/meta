import 'react-multi-carousel/lib/styles.css';

import React from 'react';
import Carousel from 'react-multi-carousel';

const SimpleSliderItem = React.memo<{
  responsive: any;
  itemClass: string;
  containerClass: string;
}>((props) => {
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={false}
      responsive={props.responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={2000}
      autoPlay={true}
      arrows={true}
      keyBoardControl={false}
      // customTransition="all .5"
      // transitionDuration={500}
      containerClass={props.containerClass ?? 'carousel-container'}
      removeArrowOnDeviceType={['tablet', 'mobile']}
      dotListClass="custom-dot-list-style"
      itemClass={props.itemClass}
    >
      {
        // @ts-ignore
        props.children
      }
    </Carousel>
  );
});

export default SimpleSliderItem;
