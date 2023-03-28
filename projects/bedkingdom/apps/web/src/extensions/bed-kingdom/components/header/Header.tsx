import withSearchBar from '@extensions/bed-kingdom/hoc/header/SearchBar/withSearchBar';
import { useExtAdditionConfig } from '@modules/ui/hook/config/useExtAdditionConfig';
import { useResponsive } from '@modules/ui/hook/useResponsive';
import ROUTES from '@values/extendable/ROUTES';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { withInitAccountState } from '@vjcspy/r/build/modules/account/hoc/withInitAccountState';
import { withUiConfigData } from '@vjcspy/r/build/modules/content/hoc/withUiConfigData';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useState } from 'react';

const Header: React.FC = combineHOC(
  withUiConfigData,
  withInitAccountState,
  withSearchBar,
  withCustomer
)((props) => {
  const megamenuId = useExtAdditionConfig('megamenu_id', props);
  const [activeMenuMobile, setActiveMenuMobile] = useState(false);
  const [activeSearchMobile, setActiveSearchMobile] = useState(false);
  // const { logoUrl, logoHeight, logoWidth } = useAppLogo(props?.state?.uiConfig);
  const { isMobile } = useResponsive();
  return (
    <>
      {!isMobile && (
        <div className="b-header-top">
          <div className="container mx-auto md:px-4">
            <ul className="b-header-links">
              <li className="greet welcome">
                <span>Bedkingdom.co.uk - Call Us 01924 950 108</span>
              </li>
              <li>
                <a href="/showroom">Showroom</a>
              </li>
              <li>
                <a href="/contact">Contact us</a>
              </li>
              <li>
                <a href="/customer-service">Help</a>
              </li>
              <li className="nav item">
                <a href="https://www.bedkingdom.co.uk/blog.html">Blog</a>
              </li>
              {props?.state?.customer && (
                <>
                  <li
                    className="nav item"
                    onClick={() => {
                      RouterSingleton.push(ROUTES.r('MY_ACCOUNT'));
                    }}
                  >
                    <span>My Account</span>
                  </li>
                </>
              )}

              {!props.state?.customer && (
                <li
                  className="link authorization-link"
                  onClick={() => {
                    RouterSingleton.push(ROUTES.r('ACCOUNT_LOGIN'));
                  }}
                >
                  <span>Sign In</span>
                </li>
              )}

              {props?.state?.customer && (
                <li
                  className="link authorization-link"
                  onClick={() => {
                    RouterSingleton.push(ROUTES.r('ACCOUNT_LOGIN'));
                  }}
                >
                  <span>Sign Out</span>
                </li>
              )}

              <li className="nav item">
                <a href="/knowledge-base/">FAQ</a>
              </li>
              {!props.state?.customer && (
                <li
                  className="cursor-pointer"
                  onClick={() => {
                    RouterSingleton.push(ROUTES.r('ACCOUNT_REGISTER'));
                  }}
                >
                  <span>Create an Account</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      <div className="b-header-center py-4">
        <UiExtension uiId="DEFAULT_META" />
        <UiExtension uiId="DEFAULT_GOOGLE_TAG_MANAGER" />
        <UiExtension uiId="ONLY_DESKTOP">
          <div className="container mx-auto md:px-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="b-block-left flex items-center justify-between">
                <div
                  className="b-header-logo mr-11 cursor-pointer"
                  onClick={() => RouterSingleton.push('/')}
                >
                  <img
                    src="https://www.bedkingdom.co.uk/media/logo/stores/2/logo.png"
                    alt=""
                    width="193"
                    height="75"
                  />
                </div>
                <UiExtension uiId="HEADER_SEARCH_BAR" />
              </div>
              <UiExtension uiId="HEADER_RIGHT_SIDE" />
            </div>
          </div>
        </UiExtension>
        <UiExtension uiId="ONLY_MOBILE">
          <div className="container mx-auto">
            <div className="header-mb grid grid-cols-3 items-center gap-3">
              <div className="block-left">
                <div className="block-left__wrap flex items-center">
                  <div
                    className="b-menu_btn mr-1"
                    onClick={() => {
                      setActiveMenuMobile(!activeMenuMobile);
                    }}
                  >
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width={28}
                      height={28}
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="#000000"
                        d="M17.5 6h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
                      />
                      <path
                        fill="#000000"
                        d="M17.5 11h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
                      />
                      <path
                        fill="#000000"
                        d="M17.5 16h-15c-0.276 0-0.5-0.224-0.5-0.5s0.224-0.5 0.5-0.5h15c0.276 0 0.5 0.224 0.5 0.5s-0.224 0.5-0.5 0.5z"
                      />
                    </svg>
                  </div>
                  <div
                    className="b-search__btn pl-3"
                    onClick={() => {
                      setActiveSearchMobile(true);
                      props.setExpandedSuggest(true);
                    }}
                  >
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="#000000"
                        d="M18.869 19.162l-5.943-6.484c1.339-1.401 2.075-3.233 2.075-5.178 0-2.003-0.78-3.887-2.197-5.303s-3.3-2.197-5.303-2.197-3.887 0.78-5.303 2.197-2.197 3.3-2.197 5.303 0.78 3.887 2.197 5.303 3.3 2.197 5.303 2.197c1.726 0 3.362-0.579 4.688-1.645l5.943 6.483c0.099 0.108 0.233 0.162 0.369 0.162 0.121 0 0.242-0.043 0.338-0.131 0.204-0.187 0.217-0.503 0.031-0.706zM1 7.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5-6.5-2.916-6.5-6.5z"
                      />
                    </svg>
                  </div>
                </div>
                <UiExtension
                  uiId="MOBILE_HEADER_SEARCH_BAR"
                  setActiveSearchMobile={setActiveSearchMobile}
                  activeSearchMobile={activeSearchMobile}
                />
              </div>
              <div className="block-logo">
                <div className="b-logo m-auto">
                  <div
                    onClick={() => {
                      RouterSingleton.push('/');
                    }}
                  >
                    <img
                      loading="lazy"
                      src="data:image/png;base64,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"
                      alt="Bedkingdom"
                      width="125px"
                      height="45px"
                    />
                  </div>
                </div>
              </div>
              <div className="block-right">
                <div className="block-right__wrap flex items-center justify-end">
                  <div
                    className="b-myAccount__mb mr-3"
                    onClick={() =>
                      RouterSingleton.push(`/${ROUTES.r('MY_ACCOUNT')}`)
                    }
                  >
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="#000000"
                        d="M9.5 11c-3.033 0-5.5-2.467-5.5-5.5s2.467-5.5 5.5-5.5 5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5zM9.5 1c-2.481 0-4.5 2.019-4.5 4.5s2.019 4.5 4.5 4.5c2.481 0 4.5-2.019 4.5-4.5s-2.019-4.5-4.5-4.5z"
                      />
                      <path
                        fill="#000000"
                        d="M17.5 20h-16c-0.827 0-1.5-0.673-1.5-1.5 0-0.068 0.014-1.685 1.225-3.3 0.705-0.94 1.67-1.687 2.869-2.219 1.464-0.651 3.283-0.981 5.406-0.981s3.942 0.33 5.406 0.981c1.199 0.533 2.164 1.279 2.869 2.219 1.211 1.615 1.225 3.232 1.225 3.3 0 0.827-0.673 1.5-1.5 1.5zM9.5 13c-3.487 0-6.060 0.953-7.441 2.756-1.035 1.351-1.058 2.732-1.059 2.746 0 0.274 0.224 0.498 0.5 0.498h16c0.276 0 0.5-0.224 0.5-0.5-0-0.012-0.023-1.393-1.059-2.744-1.382-1.803-3.955-2.756-7.441-2.756z"
                      />
                    </svg>
                  </div>
                  <UiExtension uiId="HEADER_CART" />
                </div>
              </div>
            </div>
          </div>
        </UiExtension>
      </div>
      <UiExtension
        uiId="MEGA_MENU_CONTAINER"
        activeMenu={activeMenuMobile}
        setActiveMenu={setActiveMenuMobile}
        megamenuId={megamenuId}
      />
      {RouterSingleton.pathname === '/' && <UiExtension uiId="ALERT_SHOW" />}
    </>
  );
});

export default Header;
