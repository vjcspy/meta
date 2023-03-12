import { useRouterActions } from '@main/packages-web-storefront/src/modules/router/hook/useRouterActions';
import React from 'react';

const Footer = React.memo(() => {
  const { go } = useRouterActions();
  return (
    <>
      <div className="ui_one_column_footer 123">
        {/*{props.Footer ?? null}*/}
        <div className="container">
          <div className="ui-footer_midle">
            <div className="row">
              <div className="col-sm-6 col-md-3 ui-footer__item2">
                <div className="ui-footer__coluomn">
                  <h3 className="ui-footer__title">ADIDAS</h3>
                  <ul className="ui-footer__link">
                    <li onClick={() => go('abouts')}>
                      <span>Về chúng tôi </span>
                    </li>
                    <li onClick={() => go('policy-rules')}>
                      <span>Điều khoản điều kiện</span>
                    </li>
                    <li onClick={() => go('transports')}>
                      <span>Chính sách vận chuyển</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-3 ui-footer__item2">
                <div className="ui-footer__coluomn">
                  <h3 className="ui-footer__title">TRỢ GIÚP</h3>
                  <ul className="ui-footer__link">
                    <li onClick={() => go('faqs')}>
                      <span>FAQ</span>
                    </li>
                    <li onClick={() => go('exchange-and-refunds')}>
                      <span>Chính sách trả hàng</span>
                    </li>
                    <li onClick={() => go('policy-rules')}>
                      <span>Chính sách bảo mật</span>
                    </li>
                    <li onClick={() => go('information-security-policys')}>
                      <span>Chính sách vận chuyển</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6 col-md-3 ui-footer__item1">
                <div className="ui-footer__coluomn">
                  <h3 className="ui-footer__title">Liên hệ</h3>
                  <ul className="ui-footer__link">
                    <li>
                      <a href="#">
                        <i className="fa fa-facebook" />
                        <span style={{ padding: '5px' }}>Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-instagram" />
                        <span style={{ padding: '5px' }}>Instagram</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-6 col-md-3 ui-footer__item1">
                <div className="ui-footer__coluomn">
                  {/*<img*/}
                  {/*  style={{ padding: '40px 0 0 0 ' }}*/}
                  {/*  width={150}*/}
                  {/*  height={50}*/}
                  {/*  src="https://www.google.com.vn/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"*/}
                  {/*  alt="footer"*/}
                  {/*/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Footer;
