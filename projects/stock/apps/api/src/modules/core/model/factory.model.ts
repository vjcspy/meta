export class FactoryModel<T> {
  private _resolve: any;

  constructor(model: T) {
    this._resolve = () => model;
  }

  create(): T {
    return this._resolve();
  }
}
