import type { DiscoveredMethod } from '@golevelup/nestjs-discovery';
import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { EMPTY, filter, isObservable, map, Subject } from 'rxjs';

import type { EventRxHandler, EventRxHandlerConfig } from './event-rx.types';
import type { EventRxAction } from './event-rx.types';
import type { ActionFactory } from './event-rx.types';

@Injectable()
export class EventManagerReactive {
  private logger = new Logger(EventManagerReactive.name);
  private static _eventObservable = new Subject<EventRxAction>();

  static ofType(keys: string | string[]) {
    const KEYS = typeof keys === 'string' ? [keys] : keys;

    return EventManagerReactive._eventObservable.pipe(
      filter((value) => KEYS.includes(value.type))
    );
  }
  dispatch(action: EventRxAction | ActionFactory<any>) {
    let o: any = action;
    if (typeof action === 'function') {
      o = {
        type: action().type,
      };
    }
    this.logger.log(`Dispatch action ${o.type}`);
    EventManagerReactive._eventObservable.next(o);
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
    let preActionMetaChain: any;
    EventManagerReactive._eventObservable
      .pipe(
        filter((action) => {
          let types: string[] = [];
          if (Array.isArray(config.type)) {
            types = config.type
              .map((value) => {
                if (typeof value === 'string') {
                  return value;
                } else if (typeof value === 'function' && value()?.type) {
                  return value()?.type;
                }

                return undefined;
              })
              .filter((value) => !!value) as any;
          } else {
            if (typeof config.type === 'string') {
              types = [config.type];
            } else if (typeof config.type === 'function') {
              types = [config.type().type];
            }
          }
          return types.includes(action.type);
        }),
        map((value) => {
          this.logger.log(
            `Process ${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}`,
            value
          );
          preActionMetaChain = value?.meta?.chain;
          return value;
        }),
        handlerPipe,
        map((action) => {
          if (isObservable(action)) {
            return action;
          } else {
            if (typeof preActionMetaChain !== 'undefined') {
              action.meta = {
                ...action.meta,
                chain: _.clone(preActionMetaChain),
              };
              action.meta?.chain.push(
                `${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}->${action.type}`
              );
            } else {
              action.meta = {
                chain: [
                  `${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}->${action.type}`,
                ],
              };
            }

            return action;
          }
        })
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
