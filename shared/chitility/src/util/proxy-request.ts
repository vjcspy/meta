import { CHITILITY_KEY } from '../etc/key';
import { RuntimeError } from '../lib/error/RuntimeError';
import { Registry } from './registry';

const fetchFromApi = async (
  input: string,
  action: {
    type: string;
    payload?: any;
  }
): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(
      input +
        `/proxy/${
          Registry.getInstance().registry(CHITILITY_KEY.PROXY_APP_NAME) ??
          'pcms'
        }/rest/V1/izretail/dispatch`,
      {
        method: 'POST',
        credentials: 'omit',
        body: JSON.stringify({
          action,
        }),
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          if (typeof res.error.message === 'string') {
            return reject(res.error);
          } else {
            return reject({
              message: `urlResolver query failed: ${JSON.stringify(
                res.error,
                null,
                2
              )}`,
            });
          }
        }

        return resolve(res.data);
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

export const proxyRequest = async (action: {
  type: string;
  payload?: any;
}): Promise<any> => {
  const proxyEndpoint = Registry.getInstance().registry(
    CHITILITY_KEY.PROXY_URL_KEY
  );
  if (typeof proxyEndpoint !== 'string') {
    throw new RuntimeError('Please define PROXY_DEFAULT_END_POINT in registry');
  }
  return fetchFromApi(proxyEndpoint, action);
};
