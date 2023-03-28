import clsx from 'clsx';
import debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const CheckoutCartItemQty: React.FC<{
  qty: number;
  whenUpdateItemQty: (qty: number) => void;
  canZero?: boolean;
  imme?: boolean;
}> = (props) => {
  const [qty, setQty] = useState<any>(props.qty);
  const [errorInput, setErrorInput] = useState<boolean>(false);
  const [isUpdatingInput] = useState(false);

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
    if (qty != props.qty && !isUpdatingInput && qty) {
      debounceUpdateQty(qty);
      setErrorInput(false);
    }

    if (!qty || isNaN(qty) || qty === 0) {
      setErrorInput(true);
    }
  }, [qty, isUpdatingInput]);

  return (
    <>
      <div className="b-qty flex h-40px max-w-125 items-center justify-between rounded-3 border border-color-ccc text-center text-18px md:ml-auto">
        <div
          className={clsx(
            'b-minus flex cursor-pointer justify-center',
            parseInt(qty, 10) === 1 && 'divDisable'
          )}
          onClick={() => {
            setQty(isValidNumber(qty - 1) ? qty - 1 : qty);
            setErrorInput(false);
          }}
        >
          <svg
            width="9"
            height="3"
            viewBox="0 0 9 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.875 2.125H0.125V0.875H8.875V2.125Z" fill="#5F5F5F" />
          </svg>
        </div>
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
        <div
          className="b-plus flex w-30px cursor-pointer justify-center"
          onClick={() => {
            setQty(qty + 1);
            setErrorInput(false);
          }}
        >
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.875 5.125H5.125V8.875H3.875V5.125H0.125V3.875H3.875V0.125H5.125V3.875H8.875V5.125Z"
              fill="#5F5F5F"
            />
          </svg>
        </div>
      </div>
      {errorInput && (
        <span className="mt-2 text-red-700">
          Please enter a number greater than 0 in this field.
        </span>
      )}
    </>
  );
};

export default CheckoutCartItemQty;
