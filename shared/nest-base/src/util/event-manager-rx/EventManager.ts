import { Injectable } from '@nestjs/common';
import { BehaviorSubject, filter } from 'rxjs';

import type { DataObject } from '../../model/DataObject';

export interface EventObject {
  name: string;
  payload?: DataObject;
}

@Injectable()
export class EventManagerReactive {
  private static _eventObservable = new BehaviorSubject<EventObject>({
    name: 'INIT',
  });

  constructor() {
    console.log('construct EventManagerReactive');
  }

  static get eventObservable(): BehaviorSubject<EventObject> {
    return this._eventObservable;
  }

  static ofType(keys: string | string[]) {
    const KEYS = typeof keys === 'string' ? [keys] : keys;

    return EventManagerReactive._eventObservable.pipe(
      filter((value) => KEYS.includes(value.name))
    );
  }
}
