import sortBy from 'lodash/sortBy';

export class DataValueExtension {
  private static _VALUES: any = {};
  private static _RESOLVED_VALUES: any = {};
  private static _RESOLVED_VALUES_OBJECT: any = {};

  static add(extensionId: string, key: string, data: any, priority = 100) {
    if (!DataValueExtension._VALUES.hasOwnProperty(key)) {
      DataValueExtension._VALUES[key] = {};
    }

    DataValueExtension._VALUES[key][extensionId] = {
      data,
      priority,
    };

    return this;
  }

  static extend(extensionId: string, key: string, data: any, priority = 100) {
    return DataValueExtension.add(extensionId, key, data, priority);
  }

  static resolve(
    key: string,
    defaultValue: any,
    force = false
  ): {
    getData: (key?: string) => any;
    r: (key?: string) => any;
  } {
    if (
      DataValueExtension._RESOLVED_VALUES_OBJECT.hasOwnProperty(key) &&
      !force
    ) {
      return DataValueExtension._RESOLVED_VALUES_OBJECT[key];
    }

    const resolveValueFn = () => {
      let resolvedValue = { ...defaultValue };
      let sortedValues = sortBy(DataValueExtension._VALUES[key], ['priority']);
      sortedValues = sortedValues.reverse();
      sortedValues.forEach((v: any) => {
        resolvedValue = { ...resolvedValue, ...v.data };
      });
      DataValueExtension._RESOLVED_VALUES[key] = resolvedValue;
      return resolvedValue;
    };

    const _getData = (_key: string) => {
      const _data = resolveValueFn();
      if (_key) {
        return _data[_key];
      } else {
        return _data;
      }
    };

    DataValueExtension._RESOLVED_VALUES_OBJECT[key] = {
      getData: _getData,
      r: _getData,
    };

    return DataValueExtension._RESOLVED_VALUES_OBJECT[key];
  }
}
