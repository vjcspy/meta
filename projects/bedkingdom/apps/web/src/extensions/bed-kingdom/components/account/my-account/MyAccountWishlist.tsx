import { withBedCustomerWishlistData } from '@extensions/bed-kingdom/hoc/wishlist/withCustomerWishlistData';
import { withCustomerWishlistActions } from '@vjcspy/r/build/modules/account/hoc/wishlist/withCustomerWishlistActions';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const MyAccountWishlist = combineHOC(
  withBedCustomerWishlistData,
  withCustomerWishlistActions
)((props) => {
  const itemCount = useMemo(() => {
    return props.state?.wishlists && props.state?.wishlists[0]?.items_count
      ? props.state?.wishlists[0]?.items_count
      : 0;
  }, [props.state?.wishlists]);

  const totalPage = useMemo(() => {
    if (
      props.state?.wishlists &&
      props.state?.wishlists[0]?.items_v2?.page_info?.total_pages
    ) {
      return props.state?.wishlists[0]?.items_v2?.page_info?.total_pages;
    } else {
      return 0;
    }
  }, [props.state?.wishlists]);

  const itemFrom = useMemo(() => {
    if (props.state?.wishlists) {
      if (
        props.state?.wishlists[0]?.items_v2?.page_info?.page_size &&
        props.state?.wishlists[0]?.items_v2?.page_info?.current_page > 1
      ) {
        return (
          props.state?.wishlists[0]?.items_v2?.page_info?.current_page *
            props.state?.wishlists[0]?.items_v2?.page_info?.page_size -
          props.state?.wishlists[0]?.items_v2?.page_info?.page_size
        );
      }
    }
    return 1;
  }, [props.state?.wishlists]);

  const itemTo = useMemo(() => {
    if (
      props.state?.wishlists &&
      props.state?.wishlists[0]?.items_v2?.page_info?.page_size
    ) {
      if (
        props.state?.wishlists[0]?.items_v2?.page_info?.page_size >
        props.state?.wishlists[0]?.items_count
      ) {
        return props.state?.wishlists[0]?.items_count;
      } else {
        return (
          props.state?.wishlists[0]?.items_v2?.page_info?.page_size *
          props.state?.wishlists[0]?.items_v2?.page_info?.current_page
        );
      }
    }
  }, [props.state?.wishlists]);

  const currentPage = useMemo(() => {
    if (
      props.state?.wishlists &&
      props.state?.wishlists[0]?.items_v2?.page_info?.current_page
    ) {
      return props.state?.wishlists[0]?.items_v2?.page_info?.current_page;
    }
    return 0;
  }, [props.state?.wishlists]);

  const pageSize = useMemo(() => {
    if (
      props.state?.wishlists &&
      props.state?.wishlists[0]?.items_v2?.page_info?.page_size
    ) {
      return props.state?.wishlists[0]?.items_v2?.page_info?.page_size;
    }
    return 0;
  }, [props.state?.wishlists]);

  return (
    <div className="b-sidebar-additional">
      {props.state?.isLoading && (
        <UiExtension uiId="LOADING_INDICATOR" global={false} />
      )}
      <div className="b-block-sidebar">
        <h1 className="b-account-title mb-5 mdm:font-bold">
          <span className="text-26px">My Wish List</span>
        </h1>
        <div className="b-block-content grid grid-cols-2 gap-4 md:grid-cols-3">
          {props.state?.wishlists
            ?.filter((it: any, key: number) => key === 0)
            .map((wishlist: any) => {
              return wishlist?.items_v2?.items?.map((wishlistItem: any) => (
                <div key={wishlistItem.id}>
                  <UiExtension
                    uiId="PRODUCT_LISTING_ITEM"
                    product={wishlistItem?.product}
                  />
                  <div className="box-actions mb-4 items-center justify-between md:flex">
                    <div
                      onClick={() => {
                        RouterSingleton.push(
                          `/${wishlistItem?.product?.url_key}.html`
                        );
                      }}
                      className="action flex h-40px items-center justify-center whitespace-nowrap rounded-3 bg-main-2361aa px-4 font-bold text-white md:min-w-125 mdm:mb-2 mdm:w-full"
                    >
                      Add To Cart
                    </div>
                    <div
                      className="action edit flex h-40px items-center justify-center whitespace-nowrap rounded-3 bg-red-800 px-4 font-bold text-white md:ml-3 md:min-w-125 mdm:w-full"
                      onClick={() => {
                        if (
                          typeof props?.actions?.removeWishlistItem ===
                          'function'
                        ) {
                          props?.actions?.removeWishlistItem(
                            wishlist?.id,
                            wishlistItem?.id
                          );
                        }
                      }}
                    >
                      <span>Remove item</span>
                    </div>
                  </div>
                </div>
              ));
            })}
        </div>
        {itemCount > 0 && (
          <UiExtension
            uiId="MY_ACCOUNT_PAGING"
            itemCount={itemCount}
            totalPage={totalPage}
            itemFrom={itemFrom}
            itemTo={itemTo}
            currentPage={currentPage}
            pageSize={pageSize}
            setPageSizeAction={props?.actions?.setPageSizeAction}
            setPageCurrentAction={props?.actions?.setPageCurrentAction}
          />
        )}
        {itemCount === 0 && <span>Your wish list is empty.</span>}
      </div>
    </div>
  );
});

export default MyAccountWishlist;
