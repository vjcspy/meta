/**
 * Persistence layer with expiration based on localStorage.
 */
import { isSSR } from '../../util/isSSR';
import { NamespacedLocalStorage } from './NamespacedLocalStorage';

export class BrowserPersistence {
  private readonly storage: NamespacedLocalStorage;

  constructor(localStorage: any = undefined, key = 'META_BROWSER_STORAGE') {
    if (!isSSR()) {
      if (window?.localStorage) {
        localStorage = window.localStorage;
      } else {
        console.error("Browser doesn't support local storage");
      }
    }

    this.storage = new NamespacedLocalStorage(localStorage, key);
  }

  async getItem(name: string) {
    const now = Date.now();
    const item = this.storage.getItem(name);
    if (!item) {
      return undefined;
    }
    const { value, ttl, timeStored } = JSON.parse(item);
    if (ttl && now - timeStored > ttl * 1000) {
      this.storage.removeItem(name);
      return undefined;
    }
    return JSON.parse(value);
  }

  async setItem(name: string, value: any, ttl?: number) {
    const timeStored = Date.now();
    this.storage.setItem(
      name,
      JSON.stringify({
        value: JSON.stringify(value),
        timeStored,
        ttl,
      })
    );
  }

  async removeItem(name: string) {
    this.storage.removeItem(name);
  }
}
