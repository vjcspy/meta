/* eslint-disable prefer-const */
import { createUiHOC } from '@web/ui-extension';
import extend from 'lodash/extend';
import { useCallback } from 'react';

import { useStoreContext } from '../../store/context/store';

const globalPriceFormat = {
  requiredPrecision: 2,
  integerRequired: 1,
  decimalSymbol: ',',
  groupSymbol: ',',
  pattern: '$%s',
  precision: 2,
  groupLength: 3,
};

function stringPad(string: string, times: number): string {
  return new Array(times + 1).join(string);
}

export const withPriceFormat = createUiHOC(() => {
  const storeContextValue = useStoreContext();

  const priceFormat = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (amount: any, isShowSign = true, ..._args: any[]) => {
      if (storeContextValue.storeData?.store) {
        if (isNaN(amount)) {
          return 0;
        }
        let format: any = globalPriceFormat;

        try {
          // TODO: check store price rate
          // if (typeof args !== 'undefined' && args[0] === true) {
          //   amount = StoreManager.getStore().convertPrice(amount);
          // }
          format = extend(
            globalPriceFormat,
            storeContextValue.storeData.store['price_format']
          );
        } catch (e) {
          // when user not yet pick store
        }

        let precision = isNaN(
            (format.requiredPrecision = Math.abs(format.requiredPrecision))
          )
            ? 2
            : format.requiredPrecision,
          integerRequired = isNaN(
            (format.integerRequired = Math.abs(format.integerRequired))
          )
            ? 1
            : format.integerRequired,
          decimalSymbol =
            format.decimalSymbol === undefined ? ',' : format.decimalSymbol,
          groupSymbol =
            format.groupSymbol === undefined ? '.' : format.groupSymbol,
          groupLength =
            format.groupLength === undefined ? 3 : format.groupLength,
          pattern = format.pattern || '%s',
          s = '',
          i: string,
          pad,
          j,
          re,
          r,
          am: any;

        if (isShowSign === undefined || isShowSign) {
          s = amount < 0 ? '-' : isShowSign ? '' : '';
        } else if (!isShowSign) {
          s = '';
        }
        pattern =
          pattern.indexOf('{sign}') < 0
            ? s + pattern
            : pattern.replace('{sign}', s);

        // we're avoiding the usage of to fixed, and using round instead with the e representation to address
        // numbers like 1.005 = 1.01. Using ToFixed to only provide trailig zeroes in case we have a whole number
        i =
          parseInt(
            (amount =
              Number(
                Math.round(
                  parseFloat(Math.abs(+amount || 0) + 'e+' + precision)
                ) +
                  ('e-' + precision)
              ) + ''),
            10
          ) + '';
        pad = i.length < integerRequired ? integerRequired - i.length : 0;

        i = stringPad('0', pad) + i;

        j = i.length > groupLength ? i.length % groupLength : 0;
        re = new RegExp('(\\d{' + groupLength + '})(?=\\d)', 'g');

        // replace(/-/, 0) is only for fixing Safari bug which appears
        // when Math.abs(0).toFixed() executed on '0' number.
        // Result is '0.-0' :(

        am = Number(
          Math.round(
            parseFloat(Math.abs(amount - parseFloat(i)) + 'e+' + precision)
          ) +
            ('e-' + precision)
        );

        r =
          (j ? i.substr(0, j) + groupSymbol : '') +
          i.substr(j).replace(re, '$1' + groupSymbol) +
          (precision
            ? decimalSymbol + am.toFixed(2).replace(/-/, String(0)).slice(2)
            : '');

        return <any>pattern
          .replace('%s', r)
          .replace(/^\s\s*/, '')
          .replace(/\s\s*$/, '');
      } else {
        console.error('Could not found current store when formatting price');
      }
    },
    [storeContextValue.storeData?.store]
  );

  return { priceFormat };
}, 'withPriceFormat');
