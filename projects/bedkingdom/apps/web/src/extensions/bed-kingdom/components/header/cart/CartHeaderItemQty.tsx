import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const CartHeaderItemQty: React.FC<{
  qty: number;
  whenUpdateItemQty: (qty: number) => void;
  canZero?: boolean;
  imme?: boolean;
}> = (props) => {
  const [qty, setQty] = useState<any>(props.qty);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [errorInput, setErrorInput] = useState<boolean>(false);
  // eslint-disable-next-line unused-imports/no-unused-vars
  const [isUpdatingInput, setIsUpdatingInput] = useState(false);

  const isValidNumber = useCallback((number: any) => {
    if (isNaN(number)) {
      return false;
    }
    if (props?.canZero) {
      return parseInt(number + '') >= 0;
    } else {
      return parseInt(number + '') > 0;
    }
  }, []);

  useEffect(() => {
    if (!isUpdatingInput) {
      setQty(props.qty);
    }
  }, [props.qty]);

  const debounceUpdateQty = useMemo(
    () =>
      debounce(
        (qty: number) => {
          if (props.whenUpdateItemQty) {
            props.whenUpdateItemQty(qty);
          }
        },
        props?.imme ? 0 : 1234
      ),
    []
  );

  useEffect(() => {
    if (qty != props.qty && !isUpdatingInput) {
      debounceUpdateQty(qty);
      setErrorInput(false);
    }
    if (!qty || isNaN(qty) || qty === 0) {
      setErrorInput(true);
    }
  }, [qty, isUpdatingInput]);

  return (
    <div className="b-product__qty">
      <div className="b-qty__group">
        <div className="b-buttons__added flex items-center justify-between">
          <span
            className="b-btn minus flex cursor-pointer items-center justify-between"
            onClick={() => setQty(isValidNumber(qty - 1) ? qty - 1 : qty)}
          >
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              className="bi bi-dash"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
              />
            </svg>
          </span>
          <input
            className="input-text w-full text-center text-16px"
            type="number"
            value={qty}
            onChange={(event) => {
              const value = parseInt(event?.target?.value, 10);
              if (!isNaN(value) && value > 0) {
                setErrorInput(false);
                if (value > 99) {
                  setQty(99);
                } else {
                  setQty(value);
                }
              } else {
                setQty('');
                setErrorInput(true);
              }
            }}
          />
          <span
            className="b-btn plus flex cursor-pointer items-center justify-between"
            onClick={() => setQty(qty + 1)}
          >
            <svg
              width="2em"
              height="2em"
              viewBox="0 0 16 16"
              className="bi bi-plus"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartHeaderItemQty;
