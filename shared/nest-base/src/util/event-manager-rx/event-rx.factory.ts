import type { ParamData } from '@nestjs/common';
import { isObject } from 'lodash';

export class EventRxParamFactory {
  public exchangeKeyForValue(type: number, data: ParamData, args: any[]) {
    console.log('EventRxParamFactory');
    console.log(type, data, args);
    if (!args) {
      return null;
    }

    return data && !isObject(data) ? args[0]?.[data] : args[0];
  }
}
