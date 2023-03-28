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
}>((props) => {
  const ValueList = useMemo(() => {
    if (
      Array.isArray(props.option['values']) &&
      props.option.values.length > 0
    ) {
      if (
        typeof props.option.values[0].hasOwnProperty('swatch_data') === 'object'
      ) {
        return (
          <UiExtension
            uiId="PRODUCT_TYPE_OPTIONS_CONFIGURABLE_OPTION_SWATCH_LIST"
            option={props.option}
            product={props.product}
          />
        );
      } else {
        return (
          <UiExtension
            uiId="PRODUCT_TYPE_OPTIONS_CONFIGURABLE_OPTION_TITLE_LIST"
            option={props.option}
            product={props.product}
          />
        );
      }
    } else {
      console.warn('Could not render configurable option', props);
    }
    return null;
  }, [props.option]);

  const optionClassName = useMemo(
    () => 'configurable_option_' + props.option?.attribute_code,
    []
  );

  const preparingTs = useMemo(() => {
    if (typeof props.isPreparingProductId === 'function') {
      return props.isPreparingProductId(props.product.id);
    }

    return undefined;
  }, [props.isPreparingProductId]);

  const isMissingOption = useMemo(() => {
    return !props.productInfo?.configurable?.super_attribute?.hasOwnProperty(
      props.option.attribute_code
    );
  }, [props.productInfo]);

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
