import { Registry } from 'chitility/dist/util/registry';

import { WEB_STOREFRONT_KEY } from '../etc/key';

/**
 * Interface for async persistent (work with localforage...)
 * */
export class AsyncPersistent {
  protected _asyncStorageInstance: any;
  private readonly _namespace: string;

  public constructor(asyncStorage = undefined, namespace = 'CHIAKI_STORAGE') {
    this._asyncStorageInstance = asyncStorage;
    this._namespace = namespace;
  }

  _makeKey(key: string) {
    return `${this._namespace}__${key}`;
  }

  async getItem(key: string): Promise<string | undefined> {
    key = this._makeKey(key);
    const instance = this.getAsyncStorage();

    if (instance && typeof instance.getItem === 'function') {
      try {
        const now = Date.now();
        const item = await instance.getItem(key);
        if (!item) {
          return undefined;
        }
        const { value, ttl, timeStored } = JSON.parse(item);
        if (ttl && now - timeStored > ttl * 1000) {
          await instance.removeItem(key);
          return undefined;
        }
        return JSON.parse(value);
      } catch (e) {
        console.log(e);
      }
    }

    return undefined;
  }

  async removeItem(key: string): Promise<void> {
    key = this._makeKey(key);
    const instance = this.getAsyncStorage();

    if (instance && typeof instance.removeItem === 'function') {
      try {
        await instance.removeItem(key);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async saveItem(key: string, value: any, ttl?: number): Promise<void> {
    key = this._makeKey(key);
    const instance = this.getAsyncStorage();

    if (instance && typeof instance.setItem === 'function') {
      try {
        const timeStored = Date.now();
        await instance.setItem(
          key,
          JSON.stringify({
            value: JSON.stringify(value),
            timeStored,
            ttl,
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  protected getAsyncStorage() {
    if (!this._asyncStorageInstance) {
      const instanceFn = Registry.getInstance().registry(
        WEB_STOREFRONT_KEY.ASYNC_STORAGE_INSTANCE_KEY
      );

      if (typeof instanceFn === 'function') {
        this._asyncStorageInstance = instanceFn();
      } else {
        throw new Error('please config Async storage first');
      }
    }

    return this._asyncStorageInstance;
  }
}
