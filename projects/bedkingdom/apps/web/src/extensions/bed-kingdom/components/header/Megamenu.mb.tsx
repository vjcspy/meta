import withMegaMenuData from '@extensions/bed-kingdom/hoc/navigator/withMegaMenuData';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { useBodyScroll } from '@modules/ui/hook/useBodyScroll';
import ROUTES from '@values/extendable/ROUTES';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useEffect } from 'react';

const MegamenuMb: React.FC = combineHOC(
  withMegaMenuData,
  withRouterWithStoreActions,
  withCustomer
)((props) => {
  const goToCat = useCallback((cat: any) => {
    if (typeof cat?.url_path === 'string') {
      props?.actions?.go(`/${cat.url_path}.html`);
    }
  }, []);

  const { enableScroll, disableScroll } = useBodyScroll();

  useEffect(() => {
    if (props?.activeMenu === true) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [props?.activeMenu]);
  return (
    <>
      {props?.activeMenu && (
        <div className={`b-horizontal-menu__mb is_active`}>
          <div className="b-menu__head">
            <p>Welcome to Bedkingdom</p>
            {!props.state?.customer && (
              <div className="flex">
                <div
                  onClick={() => {
                    RouterSingleton.push(ROUTES.r('ACCOUNT_LOGIN'));
                  }}
                >
                  <strong>Sign In</strong>
                </div>
                <span className="px-1">or</span>
                <div
                  onClick={() => {
                    RouterSingleton.push(ROUTES.r('ACCOUNT_REGISTER'));
                  }}
                >
                  <strong>Register</strong>
                </div>
              </div>
            )}

            <span
              className="mob-close"
              onClick={() => props.setActiveMenu(false)}
            >
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                className="icon icon-close"
                viewBox="0 0 37 40"
              >
                <path d="M21.3 23l11-11c.8-.8.8-2 0-2.8-.8-.8-2-.8-2.8 0l-11 11-11-11c-.8-.8-2-.8-2.8 0-.8.8-.8 2 0 2.8l11 11-11 11c-.8.8-.8 2 0 2.8.4.4.9.6 1.4.6s1-.2 1.4-.6l11-11 11 11c.4.4.9.6 1.4.6s1-.2 1.4-.6c.8-.8.8-2 0-2.8l-11-11z" />
              </svg>
            </span>
          </div>
          <div className="b-menu__content">
            <ul className="b-main-nav">
              {props?.state?.megamenu?.map((item: any) => {
                return (
                  <UiExtension
                    key={item!.id}
                    uiId="MEGA_MENU_ITEM"
                    goToCat={goToCat}
                    item={item}
                    activeMenu={props.activeMenu}
                    closeMenu={() => props.setActiveMenu(false)}
                  />
                );
              })}
            </ul>
          </div>
          <div className="b-menu__bottom">
            <section className="b-menu__services text-14px">
              <div className="grid grid-cols-2 gap-1">
                <a
                  className="b-menu__btn tel"
                  href="tel:0-192-495-0108"
                  title=""
                >
                  01924 950108
                </a>
                <a className="b-menu__btn" href="/" title="">
                  Our showzoom
                </a>
              </div>
            </section>
            <div className="b-livechat">
              <span>Live Chat</span>
            </div>
          </div>
        </div>
      )}
      <div
        className={`b-horizontal-screen block md:hidden ${
          props?.activeMenu && 'is_active'
        }`}
        onClick={() => props.setActiveMenu(false)}
      >
        &nbsp;
      </div>
    </>
  );
});

export default MegamenuMb;
