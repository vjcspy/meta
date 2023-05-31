import type { Observable, UnaryFunction } from 'rxjs';

export interface EventRxHandlerConfig {
  type: string | string[];
}

export interface EventRxAction {
  type: string;
  payload?: any;
  meta?: {
    chain: string[];
  };
}

export type EventRxHandler = UnaryFunction<
  Observable<EventRxAction>,
  Observable<Observable<never> | EventRxAction>
>;
