import type { IBehavior } from '@modules/map/simulation/behavior/behavior.base';
import { MonsterBehavior } from '@modules/map/simulation/behavior/monster-behavior';

export class BehaviorHelper {
  private static _cachedBehaviors: Map<string, IBehavior> = new Map();

  public static getBehavior(goId: string): IBehavior {
    if (goId === 'dummy_bug') {
      if (this._cachedBehaviors.has(goId)) {
        return this._cachedBehaviors.get(goId) as IBehavior;
      }
      const behavior = new MonsterBehavior();
      this._cachedBehaviors.set(goId, behavior);
      return behavior;
    }

    return new MonsterBehavior();
  }
}
