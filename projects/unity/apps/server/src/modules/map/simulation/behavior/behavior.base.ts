import type { Schema } from '@colyseus/schema';
import type { Clock } from 'colyseus';

export interface IBehavior {
  OnUpdate(state: Schema, clock: Clock): void;
}
