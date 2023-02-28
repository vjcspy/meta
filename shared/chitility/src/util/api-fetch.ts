import { RuntimeError } from '../lib/error/RuntimeError';
import { Registry } from './registry';

export const apiFetch = async (path: string, data: any, init?: RequestInit) => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const endpoint = Registry.getInstance().registry('PROXY_DEFAULT_URL_KEY');
    if (typeof endpoint !== 'string') {
      throw new RuntimeError(
        'Please define PROXY_DEFAULT_END_POINT in registry'
      );
    }

    const initCfg = Object.assign(
      {},
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'omit', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'error', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      },
      init
    );
    if (
      initCfg.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      initCfg.body = Object.keys(data)
        .map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(data[key]);
        })
        .join('&');
    }

    try {
      const res = await fetch(endpoint + '/' + path, initCfg);

      return resolve(res.json());
    } catch (e) {
      return reject(e);
    }
  });
};
