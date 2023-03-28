import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-medium-image-zoom/dist/styles.css';

import BED_KINGDOM_COMMON from '@extensions/bed-kingdom/values/BED_KINGDOM_COMMON';
import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
// @ts-ignore
import ThreeSixty from '@vjcspy/react-360-view';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useEffect, useMemo } from 'react';
import ImageGallery from 'react-image-gallery';
import Zoom from 'react-medium-image-zoom';
import ReactPlayer from 'react-player';

const Media = combineHOC(withCurrentProductState)(
  React.memo((props) => {
    const listImg = useMemo(() => {
      let arrImage: any[] = [];
      const listImage360: any[] = [];
      const urlPath = '';
      // @ts-ignore
      if (props?.state?.product?.bed_data?.bed_product_image.length) {
        // @ts-ignore
        props?.state?.product?.bed_data?.bed_product_image.forEach(
          (it: any) => {
            if (it?.videoUrl) {
              arrImage.push({
                original: it.url,
                thumbnail: it.url,
                label: it.label,
                video: it?.videoUrl,
                is360: false,
                renderItem: () => (
                  <ReactPlayer
                    width="100%"
                    url={it?.videoUrl}
                    playing={false}
                  />
                ),
              });
            } else {
              arrImage.push({
                original: it.url,
                thumbnail: it.url_thumbnail ?? it?.url,
                label: it.label,
                video: false,
                is360: false,
              });
            }
          }
        );
        // @ts-ignore
        if (props?.state?.product?.bed_data?.bed_product_image_360.length > 0) {
          // @ts-ignore
          props?.state?.product?.bed_data?.bed_product_image_360.forEach(
            (its: any) => {
              listImage360.push(its?.url);
            }
          );
          arrImage.splice(1, 0, {
            original:
              props?.state?.product?.bed_data?.bed_product_image_360[0]?.url,
            thumbnail: BED_KINGDOM_COMMON.IMG_360,
            is360: true,
            listImage360,
            urlPath,
            // @ts-ignore
            count:
              props?.state?.product?.bed_data?.bed_product_image_360.length,
          });
        }
      }

      if (
        props?.state?.productInfo?.configurable?.variants &&
        Array.isArray(props?.state?.productInfo?.configurable?.variants) &&
        props?.state?.productInfo?.configurable?.variants.length > 0
      ) {
        if (
          props?.state?.productInfo?.configurable?.variants[0]?.product
            ?.bed_data?.bed_product_image &&
          Array.isArray(
            props?.state?.productInfo?.configurable?.variants[0]?.product
              ?.bed_data?.bed_product_image
          ) &&
          props?.state?.productInfo?.configurable?.variants[0]?.product
            ?.bed_data?.bed_product_image.length > 0
        ) {
          const imgActive = {
            original:
              props?.state?.productInfo?.configurable?.variants[0]?.product
                ?.bed_data?.bed_product_image[0].url,
            thumbnail:
              props?.state?.productInfo?.configurable?.variants[0]?.product
                ?.bed_data?.bed_product_image[0].url_thumbnail,
            label:
              props?.state?.productInfo?.configurable?.variants[0]?.product
                ?.bed_data?.bed_product_image[0].label,
            video: false,
            is360: false,
          };

          if (imgActive?.original) {
            arrImage = arrImage.filter(
              (item: any) => item?.original !== imgActive?.original
            );
            arrImage.unshift(imgActive);
          }
        }
      }

      return arrImage;
    }, [props?.state?.product, props?.state?.productInfo]);

    // const buildGallery = useMemo(() => {},[] )

    const buildGallery = useMemo(() => {
      return (
        <ImageGallery
          items={listImg}
          autoPlay={false}
          useBrowserFullscreen={false}
          showPlayButton={false}
          // startIndex={3}
          renderItem={(children: any) => {
            if (children?.video) {
              return (
                <React.Fragment>
                  <img
                    className="image-gallery-image"
                    src={children?.original}
                    alt={children?.label || ''}
                    srcSet={children?.original}
                  />
                  {/*add label cho ảnh*/}
                </React.Fragment>
              );
            }
            if (children?.is360) {
              return (
                <>
                  {/*check ảnh 360*/}
                  {/*{children?.listImage360}*/}
                  <ThreeSixty
                    // @ts-ignore
                    amount={children?.count}
                    imageData={children?.listImage360}
                    spinReverse
                    autoplay
                    loop
                    disableZoom
                  />
                </>
              );
            }
            return (
              <Zoom>
                <img
                  src={children?.original || ''}
                  className="image-gallery-image"
                />
                {/*add label cho ảnh*/}
              </Zoom>
            );
          }}
        />
      );
    }, [listImg]);

    useEffect(() => {
      const toggleDiv = document.getElementsByClassName(
        'v360-fullscreen-toggle'
      );
      if (toggleDiv.length > 0) {
        toggleDiv[0].remove();
      }
      /*
       * Fix 360 image blurred
       * */
      const canvas = document.getElementsByClassName('v360-image-container');
      if (canvas?.length > 0) {
        const cElem = canvas[0];
        const img360 = listImg.find((i) => i?.is360 === true);
        if (img360 && img360?.listImage360?.length > 0) {
          const image = new Image();
          image.src = img360?.listImage360[0];
          image.onload = () => {
            // @ts-ignore
            cElem.style.width = `${image.width}px`;
            // @ts-ignore
            cElem.width = image.width;
            // @ts-ignore
            cElem.height = image.height;
            // @ts-ignore
            cElem.style.height = `${image.height}px`;
          };
        }
      }
    }, [listImg]);

    return (
      <>
        <UiExtension uiId="ONLY_MOBILE">
          <h1 className="b-product-title">
            <span>{props?.state?.product?.name}</span>
          </h1>
        </UiExtension>
        <div className="b-product-media">{buildGallery}</div>
      </>
    );
  })
);

export default Media;
