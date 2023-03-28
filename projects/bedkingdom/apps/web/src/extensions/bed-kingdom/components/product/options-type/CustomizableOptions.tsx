import { useResponsive } from '@modules/ui/hook/useResponsive';
import { withCurrentProductState } from '@vjcspy/r/build/modules/catalog/hoc/product/withCurrentProductState';
import { withToggleShowCustomizableOptions } from '@vjcspy/r/build/modules/catalog/hoc/product/withToggleShowCustomizableOptions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useRef } from 'react';

const CustomizableOptions = combineHOC(
  withCurrentProductState,
  withToggleShowCustomizableOptions
)((props) => {
  const toggleShowElemRef = useRef<any>();
  const { isMobile } = useResponsive();

  // useEffect(() => {
  //   if (
  //     isMobile &&
  //     !isSSR() &&
  //     props?.state?.productInfo?.isShowCustomizableOption
  //   )
  //     animateScrollTo(toggleShowElemRef.current.offsetTop - 60);
  // }, [props?.state?.productInfo?.isShowCustomizableOption]);

  return (
    <>
      {props?.state?.productInfo?.isShowCustomizableOption && (
        <div ref={toggleShowElemRef}>
          <UiExtension uiId="PRODUCT_OPTIONS_CUSTOMIZABLE" />
        </div>
      )}
    </>
  );
});

export default CustomizableOptions;
