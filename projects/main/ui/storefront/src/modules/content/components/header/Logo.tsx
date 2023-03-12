import { UiExtension } from '@web/ui-extension';
import React, { useCallback } from 'react';

const Logo = React.memo(() => {
  const go = useCallback((path: any) => {
    alert(`function not implemented ${path}`);
  }, []);
  return (
    <>
      <div className="poiter" onClick={() => go('/')}>
        <UiExtension
          uiId="IMAGE"
          alt="Home logo"
          classes={{
            container: 'ui-logo logo-container',
            image: 'logo-img',
          }}
          displayPlaceholder={true}
          src="https://www.adidas.co.uk/glass/react/38bbcaa/assets/img/icon-adidas-logo.svg"
          height={67}
          width={67}
        />
      </div>
    </>
  );
});

export default Logo;
