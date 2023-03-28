import { useResponsive } from '@modules/ui/hook/useResponsive';
import { combineHOC } from '@web/ui-extension';
import React, { useEffect, useState } from 'react';

const OnlyMobile: React.FC = combineHOC()(
  React.memo((props) => {
    const [show, setShow] = useState(false);
    const { isMobile } = useResponsive();
    useEffect(() => {
      setShow(isMobile);
    }, [isMobile]);

    return <>{show && props?.children}</>;
  })
);

export default OnlyMobile;
