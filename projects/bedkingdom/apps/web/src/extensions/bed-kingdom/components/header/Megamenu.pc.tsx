import withMegaMenuData from '@extensions/bed-kingdom/hoc/navigator/withMegaMenuData';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback } from 'react';

const MegamenuPc: React.FC = combineHOC(
  withMegaMenuData,
  withRouterWithStoreActions
)((props) => {
  const goToCat = useCallback((cat: any) => {
    if (typeof cat?.url_path === 'string') {
      props?.actions?.go(`/${cat.url_path}.html`);
    }
  }, []);
  return (
    <>
      <div className="b-header-bottom">
        <div className="b-horizontal-menu">
          <ul className="b-main-nav">
            {props?.state?.megamenu?.map((item: any) => {
              return (
                <UiExtension
                  key={item!.id}
                  uiId="MEGA_MENU_ITEM"
                  goToCat={goToCat}
                  item={item}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
});

export default MegamenuPc;
