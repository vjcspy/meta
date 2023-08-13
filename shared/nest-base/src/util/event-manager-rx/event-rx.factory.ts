import type { ParamData } from '@nestjs/common';
import { isObject } from 'lodash';

import type { ActionFactory } from './event-rx.types';

export class EventRxParamFactory {
  public exchangeKeyForValue(type: number, data: ParamData, args: any[]) {
    if (!args) {
      return null;
    }

    return data && !isObject(data) ? args[0]?.[data] : args[0];
  }
}

export function actionFactory<
  P extends Record<string, any>,
  T extends string = string
>(type: T): ActionFactory<P> {
  return (payload?: P) => ({
    type,
    payload,
  });
}
