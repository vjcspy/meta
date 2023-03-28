import { UiExtension } from '@web/ui-extension';
import React from 'react';

const MegaMenuContainer = React.memo((props: any) => {
  return (
    <>
      <UiExtension uiId="ONLY_DESKTOP">
        {props?.megamenuId && (
          <UiExtension uiId="MEGA_MENU_PC" megamenuId={props.megamenuId} />
        )}
      </UiExtension>

      <UiExtension uiId="ONLY_MOBILE">
        {props?.megamenuId && (
          <UiExtension
            uiId="MEGA_MENU_MB"
            activeMenu={props?.activeMenu}
            setActiveMenu={props?.setActiveMenu}
            megamenuId={props?.megamenuId}
          />
        )}
      </UiExtension>
    </>
  );
});

MegaMenuContainer.displayName = 'MegaMenuContainer';
export default MegaMenuContainer;
