export class DataObject {
  private readonly _data: any = {};

  private _jsonDisabled = false;

  constructor(initData?: any) {
    this._data = initData ?? {};
  }

  setDisableToJson(disabled: boolean): DataObject {
    this._jsonDisabled = disabled;

    return this;
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

  public toJSON() {
    return this._jsonDisabled ? 'to_json_disabled' : this._data;
  }
}
