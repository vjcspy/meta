import { useRouterActions } from '@main/packages-web-storefront/src/modules/router/hook/useRouterActions';
import React, { useCallback } from 'react';

const Account = React.memo<{
  state: {
    isResolvedAccountState: boolean;
    customer: any;
  };
  actions: {
    go: any;
  };
}>((props) => {
  const { go } = useRouterActions();

  const clickIconAction = useCallback(() => {
    if (props?.state?.customer) {
      go('my-account');
    } else {
      go('account-login');
    }
  }, [props?.state?.customer]);

  // const CustomerInfo = useMemo(() => {
  //   if (props.state?.customer) {
  //     return (
  //       <span
  //         onClick={() => go('my-account')}
  //         className="icon__fallback-text pl-1"
  //       >
  //         {/*{props.state.customer['firstname'] + ' ' + t('Thông tin tài khoản')}*/}
  //       </span>
  //     );
  //   } else {
  //     return (
  //       <>
  //         {' '}
  //         <span
  //           onClick={() => go('account-login')}
  //           className="icon__fallback-text pl-1"
  //         >
  //           {/*{t('Đăng nhập')} /*/}
  //         </span>
  //         <span
  //           onClick={() => go('account-register')}
  //           className="icon__fallback-text pl-1"
  //         >
  //           {/*{t('đăng ký')}*/}
  //         </span>
  //       </>
  //     );
  //   }
  // }, [props.state.isResolvedAccountState, props.state.customer]);

  return (
    <div className="ui-myaccount d-flex">
      {props.state?.isResolvedAccountState && (
        <>
          <span
            className="ui-myaccount-icon d-flex align-items-center poiter"
            onClick={() => clickIconAction()}
          >
            {/*<UiExtension*/}
            {/*  uiId="MATERIAL_BADGE"*/}
            {/*  badgeContent=""*/}
            {/*  color="error"*/}
            {/*  icon="account"*/}
            {/*  invisible={true}*/}
            {/*/>*/}
          </span>
        </>
      )}
    </div>
  );
});
export default Account;
