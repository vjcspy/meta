export class Registry {
  private static _instance: Registry = new Registry();
  private _cachedData: Record<string, any> = {};

  public static getInstance(): Registry {
    return Registry._instance;
  }

  register(key: string, value: any): Registry {
    this._cachedData[key] = value;

    return this;
  }

  registry(key: string): any | undefined {
    return this._cachedData[key];
  }

  unregister(key: string): Registry {
    delete this._cachedData[key];

    return this;
  }
}
