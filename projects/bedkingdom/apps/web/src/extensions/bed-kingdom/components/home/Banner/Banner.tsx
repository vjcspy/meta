import { withHomeBannerData } from '@extensions/bed-kingdom/hoc/home/withHomeBannerData';
import { HOME_BANNER_SLIDER } from '@extensions/bed-kingdom/values/BED_KINGDOM_SETTING_SLIDER';
import COMMON from '@extensions/bed-kingdom/values/COMMON';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { useUiContext } from '@modules/ui/context/ui';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { useWindowDimensions } from '@web/base/dist/hook/useWindowDimensions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import map from 'lodash/map';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Slider from 'react-slick';

const Banner: React.FC = combineHOC(
  withHomeBannerData,
  withRouterWithStoreActions
)((props) => {
  const uiContext = useUiContext();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { width: windowW } = useWindowDimensions();
  const [width, setWidth] = useState<any>(windowW);
  const [height, setHeight] = useState<any>();

  useEffect(() => {
    setWidth(windowW);
    if (typeof height === 'undefined') {
      setHeight(width && !isNaN(width) ? width / 3 : 400);
    }
  }, [windowW, height]);

  const images = useMemo(() => {
    if (!Array.isArray(props?.state?.bannerConfig?.banner_config)) {
      return [];
    }
    let _height: any;
    let _images = map(props?.state?.bannerConfig?.banner_config, (cfg) => {
      if (isMobile) {
        if (
          cfg?.mobile_image?.img &&
          cfg?.status === '1' &&
          props.state?.bannerConfig?.media_url
        ) {
          if (
            typeof _height === 'undefined' &&
            cfg?.mobile_image?.width &&
            cfg?.mobile_image?.height
          ) {
            _height =
              (width * parseInt(cfg.mobile_image.height)) /
              parseInt(cfg.mobile_image.width);
          }

          return {
            id: cfg.id,
            url: cfg.url,
            src: props.state?.bannerConfig?.media_url + cfg.mobile_image.img,
            title: cfg.title,
          };
        }
      } else {
        if (cfg?.image?.img && cfg?.status === '1') {
          if (
            typeof _height === 'undefined' &&
            cfg?.image?.width &&
            cfg?.image?.height
          ) {
            _height =
              (width * parseInt(cfg.image.height)) / parseInt(cfg.image.width);
          }

          return {
            id: cfg.id,
            url: cfg.url,
            src: cfg.image.img,
            title: cfg.title,
          };
        }
      }

      return null;
    });
    _images = _images.filter((v) => v !== null);
    setHeight(!isNaN(_height) ? _height : undefined);
    return _images;
  }, [props?.state?.bannerConfig, width]);

  const SLIDER = useMemo(() => {
    if (!Array.isArray(images) || images.length === 0 || isNaN(height)) {
      return (
        <div
          className="b-section__slider"
          style={{ height: height, minHeight: height }}
        >
          <div
            className="b-section__slider w-full animate-pulse bg-gray-300"
            style={{ height: height }}
          />
        </div>
      );
    }

    return (
      <>
        <Head>
          <meta
            name="title"
            content="Bed Kingdom - UK Bed Store | Best Deals - Free Delivery"
            // key="title"
          />

          <meta
            name="keywords"
            content="Bunk Beds, TV Beds, Childrens Beds, Mattresses, ottoman beds"
            key="keywords"
          />

          <meta
            name="description"
            content="Bed Kingdom the UK's Bed Store, offering the widest range from our bed shop of adult & children's beds to suit any budget. Order now for best deals and free delivery."
            key="description"
          />
        </Head>
        <div
          className="b-section__slider container mx-auto"
          style={{ height: height, minHeight: height }}
        >
          <Slider {...HOME_BANNER_SLIDER}>
            {images.map((image) => (
              <div
                key={image!.id}
                onClick={() => {
                  if (image?.url) {
                    if (image?.url.includes(COMMON.r('BASE_URL'))) {
                      RouterSingleton.push(
                        image?.url.replace(COMMON.r('BASE_URL'), '')
                      );
                    } else {
                      RouterSingleton.push(image?.url);
                    }
                  }
                }}
              >
                <UiExtension
                  uiId="IMAGE"
                  src={image!.src}
                  width={width}
                  height={height}
                />
              </div>
            ))}
          </Slider>
        </div>
      </>
    );
  }, [images, height, width, uiContext]);

  return <>{SLIDER}</>;
});

export default Banner;
