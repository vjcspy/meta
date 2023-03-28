import { Customer } from '@vjcspy/apollo';

export interface OrdersPageFilter {
  currentPage: number;
  status: any;
}

export interface WishlistPaging {
  currentPage: number;
  pageSize: number;
}

export interface AccountState {
  /*
   * Chỉ khi resolve customer state thì mới hiện các component liên quan đến đăng nhập/đăng xuất
   * */
  isResolvedCustomerState: boolean;
  token?: string;
  customer?: Customer;
  loadingState: {
    generateToken?: boolean;
    getTokenFromFb?: boolean;
    getCustomerSize?: boolean;
    getWishlist?: boolean;
    info?: boolean;
    createAccount?: boolean;
    requestResetPassword?: boolean;
    resetPassword?: boolean;
    loadingWishlist?: boolean;
  };
  deletingAddressId?: number;
  referer?: string;
  reward_points?: any;
  reviews?: any[];
  store_credit?: any;
  size_questions?: any[];
  orders: any[];
  ordersPageFilter: OrdersPageFilter;
  orderDetail?: any;
  orderFilter?: any;
  customer_size?: any[];
  wishlist?: any[];
  statusRequestResetPassword?: boolean;
  statusResetPassword?: boolean;
  dataOtp?: DataOtp;
  wishlistPaging: WishlistPaging;
}

export interface DataOtp {
  userId: string;
}

export const accountStateFactory = (): AccountState => ({
  isResolvedCustomerState: false,
  loadingState: {
    generateToken: false,
    getTokenFromFb: false,
    getCustomerSize: false,
  },
  orders: [],
  ordersPageFilter: {
    currentPage: 1,
    status: 'all',
  },
  customer_size: [],
  wishlistPaging: {
    currentPage: 1,
    pageSize: 10,
  },
});
