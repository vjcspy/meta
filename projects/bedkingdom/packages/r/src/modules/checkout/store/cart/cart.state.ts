import { Cart } from '@vjcspy/apollo';

export interface CartState {
  isResolvedCart: boolean;
  guestCartId?: string;
  customerCartId?: string;
  mergeGuestCartId?: string;
  cart?: Cart;
  adding?: {
    simple?: any[];
    configurable?: any[];
    bundle?: any[];
    virtual?: any[];
    grouped?: any[];
    downloadable?: any[];
  };
  cartItemUpdating?: number[];
  preparingProductIds: {
    productId: number;
    ts: number;
  }[];
  isUpdatingTotals?: boolean;
  isUpdatingCoupon?: boolean;
  isUpdatingPoint?: boolean;
  isUpdatingAddress?: boolean;
  editingAddressObj?: any;
  isPlacingOrder?: boolean;

  // Message ở các step checkout
  message?: any;
  completeOrderNumber?: any;
  isCartOpen?: boolean;
}

export const CartStateFactory = (): CartState => ({
  isResolvedCart: false,
  preparingProductIds: [],
  cartItemUpdating: [],
});
