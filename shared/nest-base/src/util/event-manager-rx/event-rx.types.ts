import type { Observable, UnaryFunction } from 'rxjs';

import type { EventRxContext } from './EventRxContext';

export type EventType = string | ActionFactory<any>;
export interface EventRxHandlerConfig {
  type: EventType | EventType[];
}

export interface EventRxAction<P extends Record<string, any>> {
  type: string;
  payload?: P;
  meta?: {
    chain?: string[];
  };
  context?: EventRxContext;
}

export type EventRxHandler<T extends EventRxAction<any> = EventRxAction<any>> =
  UnaryFunction<Observable<T>, Observable<any>>;

export type EffectHandler<
  ActionFactory extends (...args: any[]) => EventRxAction<any> = (
    ...args: any[]
  ) => EventRxAction<any>,
> = EventRxHandler<ReturnType<ActionFactory>>;

export type ActionFactory<P extends Record<string, any>> = (
  payload?: P,
) => EventRxAction<P>;
