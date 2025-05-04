import type { Monster } from '@modules/declaration/schemas/schema';
import type { IBehavior } from '@modules/map/simulation/behavior/behavior.base';
import type { Clock } from 'colyseus';

export class MonsterBehavior implements IBehavior {
  OnUpdate(state: Monster, clock: Clock): void {}
}
