import { PriceRange } from '@vjcspy/apollo';

/**
 * Lưu lại trạng thái trên UI của sản phẩm khi người dùng thao tác vào UI
 */
export interface ProductInfo {
  id: any;
  /*
   * Mặc dù rất không muốn lưu product vào state ở đây nhưng cần phải sử dụng để tính toán
   * Ngoài ra số lượng product được user thao tác là không nhiều nên sẽ không ảnh hưởng đến performance
   * */
  product: any;
  configurable?: {
    /*
     * super_attribute: {color: "uid",size: "uid"}
     * */
    super_attribute: Record<string, string>;
    variants?: any[];
  };
  customizable?: Record<string, string | string[]>;
  optionAdditionPrice?: number;
  qty: number;
  priceRange: PriceRange;
  isShowCustomizableOption: boolean;
  additionalAttribute?: any;
}

export interface ProductInfoState {
  products: ProductInfo[];
}

export const productInfoStateFactory = (): ProductInfoState => ({
  products: [],
});
