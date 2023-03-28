import { generateAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CUSTOMER_WISHLIST';

const getWishlist = generateAction<{}, { wishlists: any }>(
  'GET_CUSTOMER_WISH_LIST',
  PREFIX
);

export const getWishListAction = getWishlist.ACTION;
export const getWishListAfterAction = getWishlist.AFTER;
export const getWishListErrorAction = getWishlist.ERROR;

const removeWishlist = generateAction<
  { wishlistId: any; wishlistItemId: any },
  { wishlist: any }
>('REMOVE_WISH_LIST', PREFIX);
export const removeWishListAction = removeWishlist.ACTION;
export const removeWishListAfterAction = removeWishlist.AFTER;
export const removeWishListErrorAction = removeWishlist.ERROR;

const addWishlist = generateAction<
  { wishlistId: any; wishlistItems: any },
  { wishlist: any }
>('ADD_WISH_LIST', PREFIX);
export const addWishListAction = addWishlist.ACTION;
export const addWishListAfterAction = addWishlist.AFTER;
export const addWishListErrorAction = addWishlist.ERROR;
