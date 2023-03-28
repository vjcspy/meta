import { Cart } from '@vjcspy/apollo';

export interface WithCheckoutCartDataProps {
  state: {
    cart: Cart;
    isResolvedCart: boolean;
    cartItemUpdating: number[];
    isUpdatingCoupon: boolean;
    isUpdatingPoint: boolean;
    isUpdatingTotals: boolean;
    couponCode: string;
    appliedRewardPoint: any;
    isCartOpening: boolean;
  };
  actions: {
    openCart: () => void;
    closeCart: () => void;
  };
}

export interface WithCheckoutCartActionsProps {
  actions: { prepareProductAddToCart: any };
}

export interface WithIsResolvedCartProps {
  state: {
    isResolvedCart: boolean;
  };
}

export interface WithCartDetailActionsProps {
  actions: {
    updateCartItem: (updateCartItemInput: {
      cartId: string;
      cartItemId: number;
      qty: number;
    }) => void;
    removeItemFromCart: (cartId: string, cartItemId: number) => void;
    addCouponCode: (cartId: string, couponCode: string) => void;
    removeCouponCode: () => void;
  };
}

export interface WithAddToCartActionsProps {
  actions: {
    prepareProductAddToCart: (
      productId: number,
      callback?: () => void,
      qty?: number
    ) => void;
    openCart: () => void;
  };
}

export interface WithRemoveItemFromCartProps {
  actions: {
    removeItemFromCart: (cartId: string, itemId: number) => void;
  };
}

export interface WithCouponActionsProps {
  actions: {
    applyCouponToCart: (cart_id: string, coupon_code: string) => void;
    removeCouponFromCart: (cart_id: string) => void;
  };
}

export interface WithCheckoutAddressDataProps {
  state: {
    currentShippingAddress: any;
    isUpdatingAddress: boolean;
    isEditingAddress: boolean;
    editAddressObj: any;
  };
  isSelectedCustomerAdd: (customerAddId: any) => boolean;
}

export interface WithCheckoutAddressActionsProps {
  actions: {
    setShippingAddress: (address: any, customerAddressId?: string) => void;
    setBillingAddress: (address: any, customerAddressId?: string) => void;
    cancelEditAddress: () => void;
    editAddress: (address: any) => void;
  };
}

export interface WithShippingMethodDataProps {
  state: {
    availableShippingMethod: any[];
    selectedShippingMethod: any;
  };
}

export interface WithShippingMethodActionsProps {
  actions: {
    setShippingMethodAction: (carrierCode: string, methodCode: string) => void;
  };
}

export interface WithPaymentMethodDataProps {
  state: {
    availablePaymentMethods: any[];
    selectedPaymentMethod: any;
  };
}

export interface WithPaymentMethodActionsProps {
  actions: {
    setPaymentMethodAction: (methodCode: string) => void;
  };
}

export interface WithAddToCartDataProps {
  actions: { isAddingProductId: (productId: any) => boolean };
}

export interface WithCheckoutOrderActionsProps {
  actions: {
    placeOrderAction: () => void;
    placeOrderWithHookAction: () => void;
  };
}

export interface WithCheckoutOrderDataProps {
  state: {
    isPlacingOrder: boolean;
    completeOrderNumber: any;
  };
}

export interface WithCartMessageProps {
  state: {
    cartMessage: any;
  };
}

export interface WithRewardPointActionsProps {
  actions: {
    setRewardPointToCart: () => void;
    removeRewardPointFromCart: () => void;
    setRewardPointToCartWithPoint: (rewardAmountApply: number) => void;
  };
}

export interface WithCheckoutCartMessageActionsProps {
  actions: {
    setMessage: (mess: any) => void;
    clearMessage: () => void;
  };
}
