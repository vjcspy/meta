import { useTranslation } from '@main/packages-web-i18n';
import { useRouterActions } from '@main/packages-web-storefront/src/modules/router/hook/useRouterActions';
import { UiExtension } from '@web/ui-extension';
import React, { useCallback } from 'react';

const Header = (props: any) => {
  const { t, i18n } = useTranslation('common');

  const { go } = useRouterActions();

  const changeLanguageHandler = useCallback(
    (lang: string) => {
      i18n.changeLanguage(lang);
    },
    [i18n]
  );

  return (
    <>
      <div className="ui_one_column_header_inner">
        <div className="ui-header-top">
          <div className="row">
            <div className="col-4">
              <span>{t('free_ship')}</span>
            </div>
            <div className="col-4">
              <span>{t('return_60_days')}</span>
            </div>
            <div className="col-4">
              <span>{t('covid_info')}</span>
            </div>
          </div>
        </div>
        <div className="ui-header-service">
          <ul className="ui-header-service__list text-right">
            <li
              className="poiter animate__animated animate__tada animate__delay-2s animate__repeat-3"
              onClick={() =>
                changeLanguageHandler(i18n.language == 'vi' ? 'en' : 'vi')
              }
            >
              <a>
                {t('change_language') + ' '}
                <strong>
                  {i18n.language == 'vi' ? 'English' : 'Tiếng Việt'}
                </strong>
              </a>
            </li>
            <li onClick={() => go('my-wishlist')}>
              <a>{t('wishlist')}</a>
            </li>
            <li onClick={() => go('return-and-exchange')}>
              <a>{t('exchange_return')}</a>
            </li>
            <li onClick={() => go('customer-services')}>
              <a>{t('customer_service')}</a>
            </li>
            <li onClick={() => go('my-orders')}>
              <a>{t('order_information')}</a>
            </li>
            {props.state?.accountState?.customer && (
              <li>
                <a onClick={() => go('my-account')}>
                  {t('welcome')}
                  {', '}
                  <strong>
                    {
                      // @ts-ignore
                      getCustomerName(props.state?.accountState?.customer)
                    }
                  </strong>
                </a>
              </li>
            )}
            {!props.state?.accountState?.customer && (
              <li>
                <a onClick={() => go('account-login')}>{t('login')}</a>
              </li>
            )}
          </ul>
        </div>
        <div className="ui-header-midle d-flex align-items-center flex-wrap justify-content-between">
          <UiExtension uiId="HEADER_LOGO" />
          <UiExtension uiId="NAVIGATOR" />
          <div className="ui-header-right d-flex">
            {/*<UiExtension uiId="HEADER_SEARCH_BAR" />*/}
            {/*<UiExtension uiId="HEADER_ACCOUNT" />*/}
            {/*<UiExtension uiId="HEADER_WISHLIST" />*/}
            {/*<UiExtension uiId="HEADER_CART" />*/}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
