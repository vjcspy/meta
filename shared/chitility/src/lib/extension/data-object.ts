export class DataObject {
  private readonly _data: any = {};

  constructor(initData?: any) {
    this._data = initData ?? {};
  }
  getData(key?: string): any | undefined {
    if (typeof key === 'undefined') {
      return this._data;
    }

    return this._data[key];
  }

  setData(key: string, value: any): DataObject {
    this._data[key] = value;
    return this;
  }

  hasData(key: string): boolean {
    return this._data.hasOwnProperty(key);
  }

  unsetData(key: string): DataObject {
    if (this.hasData(key)) {
      delete this._data[key];
    }
    return this;
  }

  addData(data: any): DataObject {
    data.forEach((v: any, k: any) => {
      this._data[k] = v;
    });
    return this;
  }
}
