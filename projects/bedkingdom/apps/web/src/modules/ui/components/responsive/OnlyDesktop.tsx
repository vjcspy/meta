import { useResponsive } from '@modules/ui/hook/useResponsive';
import { isSSR } from '@web/base/dist/util/isSSR';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const OnlyDesktop: React.FC = combineHOC()(
  React.memo((props) => {
    const { isDesktop: isDesktopOrLaptop } = useResponsive();
    return <>{(isSSR() || isDesktopOrLaptop) && props?.children}</>;
  })
);

export default OnlyDesktop;
