import { withBedKingdomAccountActions } from '@extensions/bed-kingdom/hoc/account/withBedKingdomAccountActions';
import ROUTES from '@values/extendable/ROUTES';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { withInitAccountState } from '@vjcspy/r/build/modules/account/hoc/withInitAccountState';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const Account = combineHOC(
  withInitAccountState,
  withCustomer,
  withBedKingdomAccountActions
)((props) => {
  return (
    <>
      <UiExtension uiId="ONLY_MOBILE">
        <div className="b-myAccount flex items-center ml-8">
          <span className="b-myAccount-icon mr-2">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
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
          </span>
          <div>
            {!props.state?.customer && (
              <ul className="b-myAccount__links cursor-pointer flex text-sm">
                <li>
                  <div
                    onClick={() => {
                      RouterSingleton.push(ROUTES.r('ACCOUNT_LOGIN'));
                    }}
                  >
                    Login
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => {
                      RouterSingleton.push(ROUTES.r('ACCOUNT_REGISTER'));
                    }}
                  >
                    /Register
                  </div>
                </li>
              </ul>
            )}

            <div className="b-myAccount__label cursor-pointer">
              {props?.state?.customer && (
                <>
                  <div
                    title="account"
                    className="active"
                    onClick={() => {
                      RouterSingleton.push(ROUTES.r('MY_ACCOUNT'));
                    }}
                  >
                    <span>My Account</span>
                  </div>
                  <ul className="b-myAccount__links flex text-sm cursor-pointer">
                    <li>
                      <div
                        onClick={() => {
                          if (typeof props?.actions?.logout === 'function') {
                            props?.actions?.logout();
                          }
                        }}
                      >
                        Logout
                      </div>
                    </li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </UiExtension>
    </>
  );
});

export default Account;
