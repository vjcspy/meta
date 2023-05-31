import type { DiscoveredMethod } from '@golevelup/nestjs-discovery';
import { Injectable, Logger } from '@nestjs/common';
import { EMPTY, filter, isObservable, Subject } from 'rxjs';

import type { EventRxHandler, EventRxHandlerConfig } from './event-rx.types';
import type { EventRxAction } from './event-rx.types';

@Injectable()
export class EventManagerReactive {
  private logger = new Logger(EventManagerReactive.name);
  private static _eventObservable = new Subject<EventRxAction>();

  constructor() {
    console.log('construct EventManagerReactive');
  }

  static get eventObservable() {
    return this._eventObservable;
  }

  static ofType(keys: string | string[]) {
    const KEYS = typeof keys === 'string' ? [keys] : keys;

    return EventManagerReactive._eventObservable.pipe(
      filter((value) => KEYS.includes(value.type))
    );
  }

  async createSubscriber(
    config: EventRxHandlerConfig,
    handler: () => EventRxHandler,
    meta: {
      discoveredMethod: DiscoveredMethod;
    }
  ) {
    const handlerPipe = await handler();
    this.logger.log(
      `Create event subscriber ${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}`
    );
    EventManagerReactive._eventObservable
      .pipe(
        filter((action) => {
          const types =
            typeof config.type === 'string' ? [config.type] : config.type;

          if (typeof action?.meta === 'undefined') {
            action.meta = {
              chain: [action.type],
            };
          }
          return types.includes(action.type);
        }),
        handlerPipe
      )
      .subscribe({
        next: (value) => {
          if (isObservable(value)) {
            if (value === EMPTY) {
              // do nothing
            } else {
              this.logger.error(
                `Return observer not excepted ${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}`
              );
            }
          } else {
            EventManagerReactive._eventObservable.next(value);
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('WHY COMPLETE');
        },
      });
  }
}
