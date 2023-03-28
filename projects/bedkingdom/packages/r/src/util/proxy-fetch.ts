import { proxyRequest } from 'chitility/dist/util/proxy-request';

export const proxyFetch = async (action: {
  type: string;
  payload?: any;
}): Promise<any> => {
  return proxyRequest(action);
};
