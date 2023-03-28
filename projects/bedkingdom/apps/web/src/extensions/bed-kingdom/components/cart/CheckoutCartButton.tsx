import { withBedkingdomClearItemsCart } from '@extensions/bed-kingdom/hoc/cart/withBedkingdomClearItemsCart';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { combineHOC } from '@web/ui-extension';
import React, { useCallback } from 'react';
import Popup from 'reactjs-popup';

const CheckoutCartButton = combineHOC(
  withCheckoutCartData,
  withBedkingdomClearItemsCart
)((props) => {
  const clearItemsCart = useCallback(() => {
    const listUid: any[] = [];
    if (props.state?.cart?.items && Array.isArray(props.state?.cart?.items)) {
      props.state?.cart?.items.forEach((item: any) => {
        listUid.push({ cart_item_uid: item?.uid });
      });
    }
    if (
      listUid.length > 0 &&
      props?.actions?.removeItems &&
      props?.state?.cart?.id
    ) {
      props?.actions?.removeItems(props?.state?.cart?.id, listUid);
    }
  }, [props.state?.cart]);

  const popupDeleteAllItem = useCallback(() => {
    return (
      <Popup
        trigger={
          <button
            className="action h-40px rounded-3 bg-main-2361aa px-3 text-white"
            // onClick={() => clearItemsCart()}
          >
            Clear Basket
          </button>
        }
        modal
        nested
        className="delete"
      >
        {
          // @ts-ignore
          (close: any) => (
            <div className="modal">
              <div className="header text-15px">
                Do you want to delete this item?
              </div>
              <div className="actions">
                <button
                  type="button"
                  className="action mr-3 h-40px min-w-125 font-bold"
                  onClick={() => {
                    close();
                  }}
                >
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  className="action h-40px min-w-125 whitespace-nowrap rounded-3 bg-main-2361aa px-4 font-bold text-white"
                  value="Cancel Coupon"
                  onClick={() => {
                    clearItemsCart();
                    close();
                  }}
                >
                  <span>Ok</span>
                </button>
              </div>
            </div>
          )
        }
      </Popup>
    );
  }, [props.state?.cart]);

  return (
    <div className="actions-toolbar mt-2 mb-20 flex justify-end pt-4">
      {popupDeleteAllItem()}
      {/*<button className="action h-40px bg-main-2361aa ml-2 rounded-3 text-white pl-3 pr-3">*/}
      {/*  Update Basket*/}
      {/*</button>*/}
    </div>
  );
});

export default CheckoutCartButton;
