import {
  createAction,
  generateAction,
} from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'PRODUCT_INFO';

const INIT_PRODUCT_INFO = 'INIT_PRODUCT_INFO';
export const initProductInfo = createAction<{
  product: any;
}>(INIT_PRODUCT_INFO, PREFIX);

// CONFIGURABLE OPTIONS
const TOGGLE_CONFIGURABLE_OPTION = 'TOGGLE_CONFIGURABLE_OPTION';
export const toggleConfigurableOption = createAction<{
  productId: any;
  attrCode: any;
  valueUid: any;
  forceAdd?: boolean;
}>(TOGGLE_CONFIGURABLE_OPTION, PREFIX);

const setProductInfoQty = generateAction<{ productId: any; qty: number }, any>(
  'SET_QTY',
  PREFIX
);
export const setProductInfoQtyAction = setProductInfoQty.ACTION;
export const setProductInfoQtyAfterAction = setProductInfoQty.AFTER;
export const setProductInfoQtyErrorAction = setProductInfoQty.ERROR;

const TOGGLE_CUSTOMIZABLE_OPTION = 'TOGGLE_CUSTOMIZABLE_OPTION';
export const toggleCustomizableOption = createAction<{
  productId: any;
  optionUid: string;
  valueUid: string;
}>(TOGGLE_CUSTOMIZABLE_OPTION, PREFIX);

const TOGGLE_ADDITIONAL_ATTRIBUTE = 'TOGGLE_CUSTOM_ATTRIBUTE';
export const toggleAdditionalAttributeAction = createAction<{
  productId: any;
  attributeCode: string;
  attributeValue: string;
}>(TOGGLE_ADDITIONAL_ATTRIBUTE, PREFIX);

const CLEAR_ALL_CUSTOMIZABLE_OPTION = 'CLEAR_ALL_CUSTOMIZABLE_OPTION';
export const clearAllCustomizableOption = createAction<{
  productId: any;
}>(CLEAR_ALL_CUSTOMIZABLE_OPTION, PREFIX);

/**
 * Sẽ có 1 số ds có nút ẩn hiển để xem có show block customizable options lên hay không
 * @type {string}
 */
const TOGGLE_SHOW_CUSTOMIZABLE_OPTIONS = 'TOGGLE_SHOW_CUSTOMIZABLE_OPTIONS';
export const toggleShowCustomizableOptions = createAction<{
  productId: any;
  force?: boolean;
}>(TOGGLE_SHOW_CUSTOMIZABLE_OPTIONS, PREFIX);
