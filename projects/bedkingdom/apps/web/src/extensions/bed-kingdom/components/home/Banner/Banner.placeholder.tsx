import { useWindowDimensions } from '@web/base/dist/hook/useWindowDimensions';
import React, { useMemo } from 'react';
import LazyLoad from 'react-lazyload';
import { useMediaQuery } from 'react-responsive';

const BannerPlaceholder = React.memo<{ src: string; mbSrc: string }>(
  (props) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    const imageSrc = useMemo(() => {
      let url =
        'https://admin.magedemo.co.uk/media/weltpixel/owlcarouselslider/images/s/i/size_1.webp';
      if (isMobile && typeof props?.mbSrc === 'string') {
        url = props.mbSrc;
      } else if (!isMobile && typeof props?.src === 'string') {
        url = props?.src;
      }

      return url;
    }, [isMobile, props?.src, props?.mbSrc]);

    const { width } = useWindowDimensions();
    const height = useMemo(() => {
      return width && !isNaN(width) ? width / 3.34 : 575;
    }, [width]);

    return (
      <>
        <section
          className="b-section__slider"
          style={{ height: isMobile ? '100%' : height }}
        >
          <LazyLoad
            height={height}
            throttle={200}
            placeholder={
              <div
                className="b-section__slider w-full animate-pulse bg-gray-300"
                style={{ height: height }}
              />
            }
          >
            <img height={isMobile ? '100%' : height} src={imageSrc} />
          </LazyLoad>
        </section>
      </>
    );
  }
);

BannerPlaceholder.displayName = 'BannerTesting';
export default BannerPlaceholder;
