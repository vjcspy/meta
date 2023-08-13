import type { Observable, UnaryFunction } from 'rxjs';

import type { EventRxContext } from './EventRxContext';

export type EventType = string | ActionFactory<any>;
export interface EventRxHandlerConfig {
  type: EventType | EventType[];
}

export interface EventRxAction<P extends Record<string, any> = object> {
  type: string;
  payload?: P;
  meta?: {
    chain?: string[];
  };
  context?: EventRxContext;
}

export type EventRxHandler = UnaryFunction<
  Observable<EventRxAction<any>>,
  Observable<Observable<any> | EventRxAction<any>>
>;

export type EffectHandler = EventRxHandler;

export type ActionFactory<P extends Record<string, any>> = (
  payload?: P
) => EventRxAction<P>;
