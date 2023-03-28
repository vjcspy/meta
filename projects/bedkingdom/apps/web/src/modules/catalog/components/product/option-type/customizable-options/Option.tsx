import type { ProductInfo } from '@vjcspy/r/build/modules/catalog/store/product-info/product-info.state';
import { useWindowDimensions } from '@web/base/dist/hook/useWindowDimensions';
import { animateCSS } from '@web/base/dist/util/animateCSS';
import { UiExtension } from '@web/ui-extension';
import animateScrollTo from 'animated-scroll-to';
import React, { useEffect, useMemo, useRef } from 'react';

const Option = React.memo<{
  option: any;
  product: any;
  productInfo: ProductInfo;
  isPreparingProductId: any;
  indexKey?: any;
}>((props) => {
  const optionClassName = useMemo(
    () => 'customizable_option_' + props.option?.uid.replace('=', ''),
    []
  );

  const preparingTs = useMemo(() => {
    if (typeof props.isPreparingProductId === 'function') {
      return props.isPreparingProductId(props.product.id);
    }

    return undefined;
  }, [props.isPreparingProductId]);

  const isMissingOption = useMemo(() => {
    return (
      props?.option?.required === true &&
      !(
        preparingTs &&
        props.productInfo?.customizable?.hasOwnProperty(props.option.uid) &&
        (typeof props.productInfo?.customizable[props.option.uid] ===
          'string' ||
          Array.isArray(props.productInfo?.customizable[props.option.uid]))
      )
    );
  }, [props.productInfo, preparingTs]);

  const ValueList = useMemo(() => {
    if (
      Array.isArray(props?.option['value']) &&
      props.option.value.length > 0
    ) {
      if (
        props?.option['__typename'] === 'CustomizableDropDownOption' ||
        props?.option['__typename'] === 'CustomizableRadioOption'
      ) {
        return (
          <UiExtension
            uiId="PRODUCT_CUSTOMIZABLE_SELECT_OPTION"
            option={props.option}
            product={props.product}
            indexKey={props.indexKey}
            showRequired={preparingTs && isMissingOption}
          />
        );
      } else if (
        props?.option['__typename'] === 'CustomizableMultipleOption' ||
        props?.option['__typename'] === 'CustomizableCheckboxOption'
      ) {
        return (
          <UiExtension
            uiId="PRODUCT_CUSTOMIZABLE_MULTIPLE_SELECT_OPTION"
            option={props.option}
            product={props.product}
            indexKey={props.indexKey}
            showRequired={preparingTs && isMissingOption}
          />
        );
      }
    } else {
      console.warn('Could not render customizable option', props);
    }
    return null;
  }, [props.option]);

  useEffect(() => {
    if (preparingTs && isMissingOption) {
      animateCSS('.' + optionClassName, 'shakeX');
    }
  }, [preparingTs, isMissingOption]);

  const optionRef = useRef<any>();

  const { height } = useWindowDimensions();

  useEffect(() => {
    if (preparingTs && isMissingOption && height) {
      animateScrollTo(optionRef.current.offsetTop - height / 3);
    }
  }, [preparingTs, isMissingOption, height, optionRef]);

  return (
    props.option && (
      <>
        <div className={optionClassName} ref={optionRef}>
          {ValueList}
          {preparingTs && isMissingOption && (
            <span
              className="option-required animate__animated animate__fadeIn"
              style={{ color: '#ce0814' }}
            >
              {'this_field_is_required'}
            </span>
          )}
        </div>
      </>
    )
  );
});

export default Option;
