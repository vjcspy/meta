import { isSSR } from '@web/base/dist/util/isSSR';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';

/**
 * Bắt buộc phải inject router vào bởi có 2 lý do
 *
 * 1. Package này only depends on reactjs, not next.
 * Có thể một số function fetch data thì support next nhưng không ảnh hưởng đến các fw khác chỉ sử dụng react.
 * Do đó, nếu force get router bằng nextjs thì sẽ break rule trên.
 *
 * 2. Support multiple nextjs version
 * @param nextRouter
 * @param nextRouterSingleton
 */
export function injectNextjsRouter(nextRouter: any, nextRouterSingleton?: any) {
  RouterSingleton.registerRouter({
    push: async (url) => {
      if (isSSR()) {
        nextRouterSingleton.push(url, undefined, { shallow: true });
      } else {
        nextRouter.push(url, undefined, { shallow: true }).then(() => {
          //EMPTY
        });
      }
    },
    getPathname: () => {
      if (isSSR()) {
        {
          return nextRouter.pathname;
        }
      }
      return nextRouterSingleton.pathname;
    },
    getQuery: () => {
      return nextRouter.query;
    },
    back: () => {
      nextRouterSingleton.back();
    },
    forward: () => {
      // TODO: implement
    },
    replace: async (url) => {
      nextRouterSingleton.replace(url).then();
    },
    reload: () => {
      nextRouterSingleton.reload();
    },
  });
}
