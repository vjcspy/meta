type Url = any;

export interface Router {
  push: (url: Url, options?: any) => Promise<void>;
  replace: (url: Url, options?: any) => Promise<void>;
  back: () => void;
  forward: () => void;
  getQuery: () => any;
  getPathname: () => string;
  reload: () => void;
}

/*
 * Do ở web/web-app có cơ chế router khác nhau nên sẽ cần sử dụng chung 1 singleton để call
 * */
export class RouterSingleton {
  static _singleton: Router;
  private static _refer: string | undefined;

  static get query() {
    this.checkInjectedRouter();
    return RouterSingleton._singleton?.getQuery();
  }

  static get pathname() {
    this.checkInjectedRouter();
    return RouterSingleton._singleton?.getPathname();
  }

  static registerRouter(router: Router) {
    RouterSingleton._singleton = router;
  }

  static go(url: Url, options?: any) {
    this.checkInjectedRouter();
    RouterSingleton._singleton?.push(url, options);
  }

  static push(url: Url, options?: any) {
    this.checkInjectedRouter();
    RouterSingleton._singleton?.push(url, options);
  }

  static replace(url: Url, options?: any) {
    this.checkInjectedRouter();
    RouterSingleton._singleton?.replace(url, options);
  }

  static redirect(url: Url, refer?: string) {
    this._refer = refer;
    RouterSingleton.push(url);
  }

  static checkReferUrl() {
    if (this._refer) {
      RouterSingleton.push(this._refer);
    }
  }

  static back() {
    this.checkInjectedRouter();
    RouterSingleton._singleton?.back();
  }

  static forward() {
    this.checkInjectedRouter();
    RouterSingleton._singleton?.forward();
  }

  private static checkInjectedRouter() {
    if (typeof RouterSingleton._singleton === 'undefined') {
      console.error('please inject Router to RouterSingleton');
    }
  }
}
