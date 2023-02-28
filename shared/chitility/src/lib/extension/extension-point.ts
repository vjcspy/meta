import { Map } from 'immutable';

import { DataObject } from './data-object';

interface PointHandle {
  identifier: string;
  point: string;
  handle: (dataObject: DataObject) => boolean;
  priority: number;
}

export class ExtensionPoint {
  private static _points: Map<string, PointHandle> = Map();

  static config(
    identifier: string,
    point: string,
    handle: (dataObject: DataObject) => boolean,
    priority = 1
  ) {
    ExtensionPoint._points = ExtensionPoint._points.set(identifier, {
      identifier,
      point,
      handle,
      priority,
    });
  }

  static extend<T extends DataObject>(point: string, dataObject: T): T {
    ExtensionPoint._points
      .filter((value) => value.point === point)
      .sortBy((value) => value.priority)
      .forEach((value) => {
        return value.handle(dataObject);
      });

    return dataObject;
  }
}
