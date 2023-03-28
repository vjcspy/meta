import {
  clearAllCustomizableOption,
  initProductInfo,
  setProductInfoQtyAction,
  toggleAdditionalAttributeAction,
  toggleConfigurableOption,
  toggleCustomizableOption,
  toggleShowCustomizableOptions,
} from '@modules/catalog/store/product-info/product-info.actions';
import {
  ProductInfo,
  productInfoStateFactory,
} from '@modules/catalog/store/product-info/product-info.state';
import { resolveVariants } from '@modules/catalog/util/configurable/resolveVariants';
import { resolveProductPrice } from '@modules/catalog/util/resolveProductPrice';
import { goToCartAfterAction } from '@modules/checkout/store/cart/cart.actions';
import { createReducer } from '@main/packages-web-redux';
import remove from 'lodash/remove';

export const productInfoReducer = createReducer(
  productInfoStateFactory(),
  (builder) =>
    builder
      .addCase(initProductInfo, (state, action) => {
        remove(
          state.products,
          (pInfo) => pInfo['id'] === action.payload.product['id']
        );

        const info: ProductInfo = {
          product: action.payload.product,
          id: action.payload.product['id'],
          qty: 1,
          // @ts-ignore
          priceRange: resolveProductPrice({
            product: action.payload.product,
          }),
          isShowCustomizableOption: true,
          additionalAttribute: {},
        };

        if (action.payload.product['__typename'] === 'ConfigurableProduct') {
          info['configurable'] = {
            super_attribute: {},
          };
        }
        state.products.push(info);
      })
      .addCase(toggleConfigurableOption, (state, action) => {
        let productInfo: any = state.products.find(
          (pInfo: any) => pInfo.id == action.payload.productId
        );

        // Chắc chắn sẽ tồn tại productInfo.
        // Ngoài ra ở đây cũng không phải kiểm trà là configurable product hay không vì actions này chỉ xảy ra cho configurable product
        if (productInfo) {
          productInfo = { ...productInfo };
          if (!productInfo['configurable']) {
            productInfo.configurable = {
              super_attribute: {},
            };
          }

          // toggle option
          if (
            productInfo.configurable.super_attribute[action.payload.attrCode] ==
              action.payload.valueUid &&
            action.payload.forceAdd !== true
          ) {
            delete productInfo.configurable.super_attribute[
              action.payload.attrCode
            ];
          } else {
            productInfo.configurable.super_attribute[action.payload.attrCode] =
              action.payload.valueUid;
          }

          productInfo.priceRange = resolveProductPrice(productInfo);
          productInfo.configurable['variants'] = resolveVariants(
            productInfo.configurable.super_attribute,
            productInfo.product
          );

          state.products = state.products.filter(
            (pInfo: any) => pInfo.id != action.payload.productId
          );

          state.products.push(productInfo);
        }
      })
      .addCase(setProductInfoQtyAction, (state, action) => {
        const productInfo: any = state.products.find(
          (pInfo) => pInfo.id == action.payload.productId
        );

        if (productInfo) {
          productInfo.qty = action.payload.qty;
        }
      })
      .addCase(toggleCustomizableOption, (state, action) => {
        let productInfo: ProductInfo | undefined = state.products.find(
          (pInfo: any) => pInfo.id == action.payload.productId
        );

        if (productInfo) {
          productInfo = { ...productInfo };
          // check option
          let option = productInfo.product?.options?.find(
            (o: any) => o['uid'] === action.payload.optionUid
          );

          if (typeof productInfo.customizable === 'undefined') {
            productInfo.customizable = {};
          }

          if (
            !option &&
            productInfo?.configurable?.variants &&
            Array.isArray(productInfo?.configurable?.variants) &&
            productInfo?.configurable?.variants.length > 0 &&
            productInfo?.configurable?.variants[0]?.product?.options
          ) {
            option =
              productInfo?.configurable?.variants[0]?.product?.options?.find(
                (o: any) => o['uid'] === action.payload.optionUid
              );
          }

          if (option) {
            if (
              [
                'CustomizableDropDownOption',
                'CustomizableRadioOption',
              ].includes(option['__typename'])
            ) {
              if (
                productInfo.customizable[action.payload.optionUid] ===
                action.payload.valueUid
              ) {
                delete productInfo.customizable[action.payload.optionUid];
              } else {
                productInfo.customizable[action.payload.optionUid] =
                  action.payload.valueUid;
              }
            } else if (
              [
                'CustomizableMultipleOption',
                'CustomizableCheckboxOption',
              ].includes(option['__typename'])
            ) {
              if (
                !Array.isArray(
                  productInfo.customizable[action.payload.optionUid]
                )
              ) {
                productInfo.customizable[action.payload.optionUid] = [];
              }

              if (
                productInfo.customizable[action.payload.optionUid].includes(
                  action.payload.valueUid
                )
              ) {
                productInfo.customizable[action.payload.optionUid] =
                  // @ts-ignore
                  productInfo.customizable[action.payload.optionUid].filter(
                    (v: string) => v !== action.payload.valueUid
                  );
              } else {
                // @ts-ignore
                productInfo.customizable[action.payload.optionUid].push(
                  action.payload.valueUid
                );
              }
            }
          }

          state.products = state.products.filter(
            (pInfo: any) => pInfo.id != action.payload.productId
          );

          // calculate optionAdditionPrice
          let optionAdditionPrice = 0;
          for (const optionUid in productInfo.customizable) {
            const option = productInfo.product?.options?.find(
              (o: any) => o['uid'] === optionUid
            );
            if (option) {
              if (Array.isArray(productInfo.customizable[optionUid])) {
                // @ts-ignore
                productInfo.customizable[optionUid].forEach((vUid: string) => {
                  const value = option.value.find(
                    (v: any) => v['uid'] === vUid
                  );
                  if (value) {
                    if (value['price_type'] === 'FIXED') {
                      optionAdditionPrice += parseFloat(value['price']);
                    }
                  }
                });
              } else if (
                typeof productInfo?.customizable[optionUid] === 'string'
              ) {
                const value = option.value.find(
                  (v: any) => v['uid'] === productInfo!.customizable![optionUid]
                );
                if (value) {
                  if (value['price_type'] === 'FIXED') {
                    optionAdditionPrice += parseFloat(value['price']);
                  }
                }
              }
            }
          }
          productInfo['optionAdditionPrice'] = optionAdditionPrice;
          state.products.push(productInfo);
        }
      })
      .addCase(clearAllCustomizableOption, (state, action) => {
        const productInfo: ProductInfo | undefined = state.products.find(
          (pInfo: any) => pInfo.id == action.payload.productId
        );

        if (productInfo) {
          productInfo.customizable = undefined;
        }
      })
      .addCase(toggleShowCustomizableOptions, (state, action) => {
        const productInfo: ProductInfo | undefined = state.products.find(
          (pInfo: any) => pInfo.id == action.payload.productId
        );

        if (productInfo) {
          if (typeof action.payload.force !== 'undefined') {
            productInfo.isShowCustomizableOption = action.payload.force;
          } else {
            productInfo.isShowCustomizableOption =
              !productInfo.isShowCustomizableOption;
          }

          if (!productInfo.isShowCustomizableOption) {
            productInfo.customizable = undefined;
          }
        }
      })
      .addCase(toggleAdditionalAttributeAction, (state, action) => {
        const productInfo: ProductInfo | undefined = state.products.find(
          (pInfo: any) => pInfo.id == action.payload.productId
        );

        if (productInfo) {
          if (
            action.payload.attributeCode === 'date_picker' &&
            productInfo.additionalAttribute
          ) {
            productInfo.additionalAttribute.date_picker =
              action.payload.attributeValue;
          }
        }
      })
      .addCase(goToCartAfterAction, (state) => {
        state.products = [];
      })
);
