import { useSelector } from '@main/packages-web-redux';
import { selectProductInfo } from '@modules/catalog/store/product-info/product-info.selectors';
import { createUiHOC } from '@web/ui-extension';
import find from 'lodash/find';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import unionBy from 'lodash/unionBy';
import { useMemo } from 'react';

export const withProductGallery = createUiHOC((props: any) => {
  // TODO: phải get được những attribute nào sẽ append image vào galery khi được chọn.
  const addToGalleryWhenHasAttributes = ['color'];

  if (!props.hasOwnProperty('product')) {
    console.info(
      'Could not found product data in props when install hoc withProductGallery'
    );
    return { gallery: [] };
  }

  const product: any = props.product;
  // @ts-ignore
  const productInfo: any = useSelector(selectProductInfo)(product['id']);

  const galleryData = useMemo(() => {
    let gallery: any[] = [];

    if (
      Array.isArray(product['media_gallery']) &&
      product.media_gallery.length > 0
    ) {
      forEach(product.media_gallery, (g) => {
        if (g['disabled'] !== true) {
          gallery.push(g);
        }
      });
    }

    // Check if configurable
    if (product['__typename'] === 'ConfigurableProduct') {
      // Kiểm tra chọn những attribute được add vào gallery
      if (
        productInfo &&
        typeof productInfo['configurable'] &&
        !isEmpty(productInfo.configurable['super_attribute']) &&
        productInfo['product']
      ) {
        const attributeIds = keys(productInfo.configurable['super_attribute']);

        forEach(attributeIds, (attrId) => {
          const option = find(
            productInfo.product['configurable_options'],
            (o) => o['attribute_id_v2'] == attrId
          );

          if (
            !!option &&
            includes(addToGalleryWhenHasAttributes, option['attribute_code']) &&
            productInfo.configurable.variants.length > 0
          ) {
            let isSelected = true;
            forEach(
              // @ts-ignore
              productInfo.configurable.variants[0].product.media_gallery,
              (g) => {
                if (g['disabled'] !== true) {
                  gallery.push({ ...g, isSelected });
                  isSelected = false;
                }
              }
            );
          }
        });
      }

      if (
        productInfo &&
        productInfo['configurable'] &&
        Array.isArray(productInfo.configurable['variants']) &&
        productInfo.configurable.variants.length === 1
      ) {
        let isSelected = !find(gallery, (g) => g['isSelected'] === true);
        if (
          Array.isArray(
            // @ts-ignore
            _.first(productInfo.configurable?.variants).product?.media_gallery
          )
        ) {
          forEach(
            // @ts-ignore
            productInfo.configurable.variants[0].product.media_gallery,
            (g) => {
              if (g['disabled'] !== true) {
                gallery.push({ ...g, isSelected });
                isSelected = false;
              }
            }
          );
        }
      }
    }
    gallery = unionBy(gallery, (g) => g['url']);

    return {
      gallery,
    };
  }, [productInfo]);

  return { ...galleryData };
}, 'withProductGallery');
