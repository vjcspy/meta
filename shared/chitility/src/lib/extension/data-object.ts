export class DataObject {
  private readonly _data: any = {};

  private _jsonDisabled = true;

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
    for (let i = 0; i < Object.entries(data).length; i++) {
      const [key, value] = Object.entries(data)[i];
      this.setData(key, value);
    }
    return this;
  }

  public toJSON() {
    return this._jsonDisabled ? 'to_json_disabled' : this._data;
  }
}
