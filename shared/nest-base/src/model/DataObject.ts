export class DataObject {
  private _data = {};

  getData<T>(key: string): T | undefined {
    return this._data[key];
  }

  addData<T>(key: string, value: T): DataObject {
    this._data[key] = value;
    return this;
  }

  hasData(key: string): boolean {
    return this._data.hasOwnProperty(key);
  }

  unsetData(key: string): DataObject {
    delete this._data[key];
    return this;
  }
}
