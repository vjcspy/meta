import ROUTES from '@values/extendable/ROUTES';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const Sidebar = combineHOC()((props) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div className="b-sidebar-main">
      <div
        className="block-collapsible-nav-title flex justify-between items-center md:hidden -ml-4 -mr-4 pl-4 pr-4 bg-color-f5f5f5 pt-3 pb-3  text-18px"
        onClick={() => {
          setActiveMenu(!activeMenu);
        }}
      >
        <span>My Account </span>
        <svg
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 6.33398L0 1.33398L1.175 0.158984L5 3.97565L8.825 0.158984L10 1.33398L5 6.33398Z"
            fill="#5F5F5F"
          />
        </svg>
      </div>
      {/*trong mobile click ben tren nay thi remove class hidden ben duoi*/}
      <div
        className={clsx(
          'b-collapsible-nav md:block bg-color-f5f5f5 mdm:-ml-4 mdm:-mr-4 mdm:mb-4',
          !activeMenu && 'hidden'
        )}
      >
        <ul className="nav items">
          {/*add class active khi chon menu*/}
          <li
            className={clsx(
              'nav item  ',
              router.asPath.includes(ROUTES.r('MY_ACCOUNT')) && 'active'
            )}
            onClick={() => {
              RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT'));
            }}
          >
            <span>My Account</span>
          </li>
          <li
            className={clsx(
              'nav item',
              (router.asPath.includes(ROUTES.r('MY_ACCOUNT_ORDERS')) ||
                router.asPath.includes(ROUTES.r('ORDER_DETAIL'))) &&
                'active'
            )}
            onClick={() => {
              RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_ORDERS'));
            }}
          >
            <span>My Orders</span>
          </li>
          <li
            className={clsx(
              'nav item',
              router.asPath.includes(ROUTES.r('MY_ACCOUNT_WISHLIST')) &&
                'active'
            )}
            onClick={() => {
              RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_WISHLIST'));
            }}
          >
            <span>My Wish List</span>
          </li>
          <li
            className={clsx(
              'nav item',
              router.asPath.includes(ROUTES.r('MY_ACCOUNT') && 'active')
            )}
          >
            <span className="delimiter" />
          </li>
          <li
            className={clsx(
              'nav item',
              router.asPath.includes(ROUTES.r('ADDRESS_BOOK')) && 'active'
            )}
            onClick={() => {
              RouterSingleton.push('/' + ROUTES.r('ADDRESS_BOOK'));
            }}
          >
            <span>Address Book</span>
          </li>
          <li
            className={clsx(
              'nav item',
              router.asPath.includes(ROUTES.r('MY_ACCOUNT_EDIT')) && 'active'
            )}
            onClick={() => {
              RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_EDIT'));
            }}
          >
            <span>Account Information</span>
          </li>
          <li className="nav item">
            <span className="delimiter" />
          </li>
          <li
            className={clsx(
              'nav item',
              router.asPath.includes(ROUTES.r('MY_ACCOUNT_NEWSLETTER')) &&
                'active'
            )}
            onClick={() => {
              RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_NEWSLETTER'));
            }}
          >
            <span>Newsletter Subscriptions</span>
          </li>
          <li
            className={clsx(
              'nav item',
              router.asPath.includes(ROUTES.r('MY_ACCOUNT_GIFT_CART')) &&
                'active'
            )}
            onClick={() => {
              RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_GIFT_CART'));
            }}
          >
            <span>Gift Cards</span>
          </li>
          <li
            className={clsx(
              'nav item',
              router.asPath.includes(ROUTES.r('MY_ACCOUNT_ANONYMISE')) &&
                'active'
            )}
            onClick={() => {
              RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_ANONYMISE'));
            }}
          >
            <span>Anonymise My Data</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Sidebar;
