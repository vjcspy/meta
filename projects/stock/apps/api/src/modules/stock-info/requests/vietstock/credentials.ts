import { parseCookies } from '@modules/stock-info/util/parseCookies';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

export interface VietStockCredentialsInterface {
  sid: string;
  rvt: string;
  vtsUsrLg: string;
  usrTk: string;
  csrf: string;
}

export class VietStockCredentials {
  protected _cachedCredentials: VietStockCredentialsInterface;

  public async retrieveCredentials() {
    if (typeof this._cachedCredentials === 'undefined') {
      const loggedCrds = await this.loggedCookies();
      let sid = '1i1225usk5lljrcwny0tmffl';
      let rvt =
        'nLE53UKUb9eZX-5Nv3aMQ4jYuOZ-2Y9nvkGXZ0dAM1TYu_7tHQPsDhyrKF87cZu423xFKHggL0kq-ywWhRMEe8ZKpoH7Lc8X2QDQ0YSrfZM1';
      let vtsUsrLg =
        '3C423246818F0E3528187CCAAC8884C7DC2AC16F9370B0F46310C7C97868240303DA0954B5ABFD2F42DBFAD6F7E849A820ED218753FBE20CFE166B2C0CF57CB3781FC08C58FD42AB62243B08DB47839FD9C85C2C1492899C1E2EAA852FB5384C5967E0EA4C74D4E0A3D959F9FED70743D68F7E7139D3C4B3B60DC6D726AE60D2';
      let usrTk = 'wAoBVyA7RUuS5D/peNITBQ==';

      if (loggedCrds.cookies === '') {
        throw new Error('could not get cookies');
      }

      const cookieMap = Object.fromEntries(
        loggedCrds.cookies.split(';').map((part) => {
          const [key, ...val] = part.trim().split('=');
          return [key, val.join('=')];
        }),
      );
      sid = cookieMap['ASP.NET_SessionId'];
      rvt = cookieMap.__RequestVerificationToken;
      vtsUsrLg = cookieMap.CookieLogin;
      usrTk = cookieMap.vst_usr_lg_token;

      const csrfAfterLogin = await this.retrieveCookiesAndCsrf(
        loggedCrds.cookies,
        false,
      );
      this._cachedCredentials = {
        sid,
        rvt,
        vtsUsrLg,
        usrTk,
        csrf: csrfAfterLogin.csrf,
      };
    }

    return this._cachedCredentials;
  }

  protected async loggedCookies() {
    try {
      const { cookies, csrf } = await this.retrieveCookiesAndCsrf();
      const res = await fetch('https://finance.vietstock.vn/Account/Login', {
        headers: {
          accept: '*/*',
          'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
          'cache-control': 'no-cache',
          'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
          pragma: 'no-cache',
          'sec-ch-ua':
            '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-origin',
          'x-requested-with': 'XMLHttpRequest',
          cookie: cookies,
          Referer:
            'https://finance.vietstock.vn/doanh-nghiep-a-z/danh-sach-niem-yet?page=1',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: `__RequestVerificationToken=${csrf}&Email=dinhkhoi.le05%40gmail.com&Password=536723&responseCaptchaLoginPopup=&g-recaptcha-response=&Remember=false&X-Requested-With=XMLHttpRequest`,
        method: 'POST',
      });
      console.log('login vietstock res', await res.text());
      const cookiesAfterLogin = parseCookies(res);

      return {
        cookies: `${cookies}; ${cookiesAfterLogin}`,
      };
    } catch (e) {
      console.log(e);
      console.log('login error');
    }

    return {};
  }

  protected async retrieveCookiesAndCsrf(initCookies?: any, needCookie = true) {
    try {
      const res = await fetch(
        'https://finance.vietstock.vn/doanh-nghiep-a-z/danh-sach-niem-yet?page=1',
        {
          headers: {
            accept:
              'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'vi,en-US;q=0.9,en;q=0.8',
            'cache-control': 'no-cache',
            pragma: 'no-cache',
            'sec-ch-ua':
              '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-user': '?1',
            cookie: initCookies,
            'upgrade-insecure-requests': '1',
            Referer: 'https://www.google.com/',
            'Referrer-Policy': 'origin',
          },
          body: null,
          method: 'GET',
        },
      );
      const text = await res.text();
      const htmlParsed: any = parse(text);
      const input = htmlParsed.querySelector(
        '[name=__RequestVerificationToken]',
      );
      const csrf = input.getAttribute('value');
      let cookies;
      if (needCookie) {
        cookies = parseCookies(res);
      }

      return {
        csrf,
        cookies,
      };
    } catch (e) {
      console.log('error');
    }

    return {};
  }
}

export const VietStockCrds = new VietStockCredentials();
