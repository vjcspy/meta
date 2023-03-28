import type { Settings } from 'react-slick';

export const SLIDER_BUSINESS_REVIEWS: Settings = {
  dots: false,
  infinite: true,
  speed: 300,
  arrows: true,
  slidesToShow: 5,
  slidesToScroll: 5,
  adaptiveHeight: false,
  lazyLoad: 'ondemand',
  autoplay: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

export const SLIDER_PRODUCT_HORIZONTAL_ITEM_HOME: Settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: false,
  lazyLoad: 'ondemand',
  autoplay: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
export const SLIDER_PRODUCT_VIEWED_HORIZONTAL_ITEM_HOME: Settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  arrows: true,
  slidesToShow: 3,
  slidesToScroll: 3,
  adaptiveHeight: false,
  lazyLoad: 'ondemand',
  autoplay: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
export const SLIDER_PRODUCT_VERTICAL_ITEM_HOME: Settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  arrows: true,
  slidesToShow: 3,
  lazyLoad: 'ondemand',
  slidesToScroll: 3,
  adaptiveHeight: false,
  autoplay: false,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 980,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};
export const SLIDER_IMAGE_SWATCHES: Settings = {
  dots: false,
  infinite: true,
  speed: 1000,
  autoplay: false,
  slidesToShow: 7,
  lazyLoad: 'ondemand',
  slidesToScroll: 1,
  adaptiveHeight: true,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 5,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
      },
    },
  ],
};

export const HOME_BANNER_SLIDER: Settings = {
  className: 'slider variable-width',
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  variableWidth: true,
};
