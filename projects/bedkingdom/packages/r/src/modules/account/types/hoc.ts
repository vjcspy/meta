import {
  AccountState,
  OrdersPageFilter,
} from '@modules/account/store/account.state';
import {
  Customer,
  CustomerAddressInput,
  CustomerUpdateInput,
  RewardPoints,
  SearchResultPageInfo,
} from '@vjcspy/apollo';

export interface WithAccountStateProps {
  state: {
    accountState: AccountState;
  };
}

export interface WithCustomerProps {
  state: {
    customer: Customer;
    isUpdatingCustomerInfo: boolean;
  };
}

export interface WithInitAccountStateProps {
  state: {
    isResolvedAccountState: boolean;
  };
}

export interface WithAccountActionsProps {
  actions: {
    generateCustomerToken: (email: string, password: string) => void;
    registerCustomerAccount: (customerData: any) => void;
    dispatchCheckCustomerIsLogged: () => void;
    onLoginSocial: (provider: string, token: string) => void;
    logout: () => void;
    updateCustomer: (input: any) => void;
  };
}

export interface WithAccountLoadingStateProps {
  state: {
    isGeneratingToken: boolean;
    isCustomerLogged: boolean;
    isShowLoginForm: boolean;
    isLoadingState: any;
  };
}

export interface WithCustomerActionsProps {
  actions: {
    getRewardPoint: () => void;
    getCustomerReviews: () => void;
    getStoreCredit: () => void;
  };
}
export interface WithSizeQuestionActionsProps {
  actions: {
    getSizeQuestion: () => void;
    saveAnswer: (name: string, answers: any) => void;
    selectActiveSize: (
      size_id: string,
      pants_size: string,
      shirt_size: string
    ) => void;
    getCustomerSizes: () => void;
  };
}

export interface WithSizeQuestionStateProps {
  state: {
    questions: any[];
    isLoadingCustomerSizes: boolean;
    customer_size: any[];
  };
}

export interface WithStoreCreditProps {
  state: {
    store_credit: any;
  };
}

export interface WithRewardPointsProps {
  state: {
    reward_points: any;
  };
}

export interface WithCustomerOrdersProps {
  state: {
    orders: any[];
    pageFilter: OrdersPageFilter;
    pageInfoRes: SearchResultPageInfo;
    isLoading: boolean;
  };
  actions: {
    handleLoadMorePage: () => void;
    setFilterStatus: (status: string) => void;
  };
}

export interface WithCreateAccountProps {
  actions: {
    createCustomerAccount: (customerData: any) => void;
  };
  state: { isCreating: boolean };
}

export interface WithCustomerAddressProps {
  state: {
    customerAddress: any[];
    deletingAddressId: undefined | number;
    defaultAddressId: string;
  };
}

export interface WithCustomerAddressActionsProps {
  actions: {
    updateCustomerAddress: (id: number, input: CustomerAddressInput) => void;
    createNewCustomerAddress: (input: CustomerAddressInput) => void;
    deleteCustomerAddress: (id: number) => void;
  };
}

export interface WithCustomerOrderDetailProps {
  actions: {
    getOrderDetail: (orderId: number) => void;
  };
  state: {
    orderDetail: any;
    loading: boolean;
  };
}

export interface WithRewardPointDataProps {
  state: {
    reward_points: RewardPoints;
  };
}
export interface WithMyOrdersPagingProps {
  state: {
    orders: any;
    currentPage: any;
    currentStatus: string;
    isLoading: boolean;
  };
  actions: {
    setCurrentPage: (currentPage: any) => void;
    setFilterStatus: (status: string) => void;
  };
}
export interface WithCustomerWishlistActionsProps {
  actions: {
    removeWishlistItem: (wishlistId: any, wishlistItemId: any) => void;
    addProductsToWishlist: (wishlistId: any, wishlistItemId: any) => void;
  };
}
export interface WithCustomerWishlistDataProps {
  state: {
    wishlists: any[];
    isLoading: boolean;
  };
}

export interface WithUpdateCustomerInfoActionsProps {
  actions: { updateCustomerInfo: (info: CustomerUpdateInput) => void };
}

export interface WithPhoneAuthActionsProps {
  actions: {
    requestOtp: (phone: string) => void;
    submitOtp: (info: any) => void;
  };
  state: {
    isLoading: boolean;
    isRequestSuccess: boolean;
    authInfo: any;
    phone: string;
    // fake when testing
    otp: any;
  };
}

export interface WithCustomerOrderPageInfoProps {
  state: {
    pageFilter: OrdersPageFilter;
  };
  actions: {
    setFilterStatus: (status: string) => void;
  };
}

export interface WithAccountResetPasswordProps {
  actions: {
    requestPasswordReset: (email: string) => void;
    resetPassword: (
      mail: string,
      resetPasswordToken: string,
      newPassword: string
    ) => void;
    requestPasswordResetApp: (email: string) => void;
    requestPasswordResetWeb: (email: string) => void;
    resetPasswordByOldPass: (
      currentPassword: string,
      newPassword: string
    ) => void;
  };
  state: {
    email: string;
  };
}
