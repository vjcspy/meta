import { MapSchema } from '@colyseus/schema';
import type { MapMonsterDB } from '@modules/declaration/dto/db/map/monster';
import {
  EntityVisualization,
  Monster,
  Position,
  Vector3,
} from '@modules/declaration/schemas/schema';
import { Vector3Value } from '@modules/declaration/values/entity';
import { BehaviorHelper } from '@modules/map/helpers/behavior.helper';
import { randomId } from '@modules/utils/uuid';

export class MapMonsterHelper {
  static buildSchema(mapMonsters: MapMonsterDB[]): MapSchema<Monster> {
    const monsters = new MapSchema<Monster>();

    mapMonsters.forEach((monsterDB) => {
      const serverId: string = randomId();

      const monster = Monster.factory(
        monsterDB.id,
        Position.factory(
          Vector3.factory(
            monsterDB.position.x +
              Math.random() * (2 * monsterDB.behavior.moveRadius) -
              monsterDB.behavior.moveRadius, // randomize x position
            monsterDB.position.y,
            monsterDB.position.z,
          ),
        ),
        Vector3Value.DEFAULT_FACING_DIRECTION,
        EntityVisualization.factory(0),
      );

      monster.serverSyncId = serverId;
      monster.__additionalData = {
        mapMonsterDB: monsterDB,
        behavior: BehaviorHelper.getBehavior(monsterDB.id),
      };
      monsters.set(serverId, monster);
    });

    return monsters;
  }
}
