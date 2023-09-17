import type { DiscoveredMethod } from '@golevelup/nestjs-discovery';
import { Injectable, Logger } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { EMPTY, filter, isObservable, map, of, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';

import { CorrelationType } from '../context/AbstractContext';
import type {
  ActionFactory,
  EventRxAction,
  EventRxHandler,
  EventRxHandlerConfig,
} from './event-rx.types';
import { EventRxContext } from './EventRxContext';

@Injectable()
export class EventManagerReactive {
  private logger = new Logger(EventManagerReactive.name);

  private static _eventObservable = new Subject<EventRxAction<any>>();

  public constructor(private readonly moduleRef: ModuleRef) {}

  static ofType(keys: string | string[]) {
    const KEYS = typeof keys === 'string' ? [keys] : keys;

    return EventManagerReactive._eventObservable.pipe(
      filter((value) => KEYS.includes(value.type)),
    );
  }

  async dispatch<P extends Record<string, any>>(
    action: EventRxAction<P> | ActionFactory<P>,
  ) {
    let o: any = action;
    if (typeof action === 'function') {
      o = action();
    }
    if (typeof o === 'object') {
      o.context = new EventRxContext();
      o.context.refreshXCorrelationId(CorrelationType.EVENT_RX);
    } else {
      this.logger.error('Dispatch wrong action type');
    }

    this.logger.log(`Dispatch action ${o.type}`, { action: o });
    EventManagerReactive._eventObservable.next(o);
  }

  async createSubscriber(
    config: EventRxHandlerConfig,
    handler: () => Promise<EventRxHandler>,
    meta: {
      discoveredMethod: DiscoveredMethod;
    },
  ) {
    const handlerPipe = await handler();
    this.logger.log(
      `Create event subscriber ${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}`,
    );
    // let preActionMetaChain: any;
    EventManagerReactive._eventObservable
      .pipe(
        mergeMap((a) => {
          const context = a?.context;
          return of(a).pipe(
            filter((action) => {
              let types: string[] = [];
              if (Array.isArray(config.type)) {
                types = config.type
                  .map((value) => {
                    if (typeof value === 'string') {
                      return value;
                    }
                    if (typeof value === 'function' && value()?.type) {
                      return value()?.type;
                    }

                    return undefined;
                  })
                  .filter((value) => !!value) as any;
              } else if (typeof config.type === 'string') {
                types = [config.type];
              } else if (typeof config.type === 'function') {
                types = [config.type().type];
              }
              return types.includes(action.type);
            }),
            map((action) => {
              this.logger.log(
                `Process ${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}`,
                { action },
              );
              // preActionMetaChain = value?.meta?.chain;
              return action;
            }),
            handlerPipe,
            map((action) => {
              if (isObservable(action)) {
                return action;
              }

              // TODO: add chains
              // if (typeof preActionMetaChain !== 'undefined') {
              //   action.meta = {
              //     ...action.meta,
              //     chain: _.clone(preActionMetaChain),
              //   };
              //   action.meta?.chain.push(
              //     `${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}->${action.type}`
              //   );
              // } else {
              //   action.meta = {
              //     chain: [
              //       `${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}->${action.type}`,
              //     ],
              //   };
              // }

              if (context) {
                // eslint-disable-next-line no-param-reassign
                // @ts-ignore
                action.context = context;
              }

              return action;
            }),
          );
        }),
      )
      .subscribe({
        next: (value) => {
          if (isObservable(value)) {
            if (value === EMPTY) {
              // do nothing
            } else {
              this.logger.error(
                `Return not excepted observer for ${meta.discoveredMethod.parentClass.name}.${meta.discoveredMethod.methodName}`,
              );
            }
          } else {
            EventManagerReactive._eventObservable.next(value as any);
          }
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.logger.warn('WHY COMPLETE???');
        },
      });
  }
}
