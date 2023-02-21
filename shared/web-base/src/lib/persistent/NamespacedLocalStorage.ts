export class NamespacedLocalStorage {
  localStorage: any;
  key: string;

  constructor(localStorage: any, key: string) {
    this.localStorage = localStorage;
    this.key = key;
  }

  protected checkStorage() {
    if (!this.localStorage) {
      throw new Error("Browser doesn't support local storage");
    }
  }

  _makeKey(key: string) {
    return `${this.key}__${key}`;
  }

  getItem(name: string) {
    if (!this.localStorage) {
      return null;
    }
    return this.localStorage.getItem(this._makeKey(name));
  }

  setItem(name: string, value: any) {
    this.checkStorage();
    return this.localStorage.setItem(this._makeKey(name), value);
  }

  removeItem(name: string) {
    this.checkStorage();
    return this.localStorage.removeItem(this._makeKey(name));
  }
}
