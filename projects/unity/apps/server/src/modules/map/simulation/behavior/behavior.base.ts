import type { Clock } from 'colyseus';

export interface IBehavior {
  OnUpdate(state: any, clock: Clock): void;
}
