import { MapSchema } from '@colyseus/schema';
import type { MapMonsterDB } from '@modules/declaration/dto/db/map/monster';
import {
  EntityVisualization,
  Monster,
  Position,
  Vector3,
} from '@modules/declaration/schemas/schema';
import { Vector3Value } from '@modules/declaration/values/entity';
import { randomId } from '@modules/util/uuid';

export class MapMonsterHelper {
  static buildSchema(mapMonsters: MapMonsterDB[]): MapSchema<Monster> {
    const monsters = new MapSchema<Monster>();

    mapMonsters.forEach((monsterDB) => {
      const serverId: string = randomId();

      const monster = Monster.factory(
        monsterDB.id,
        Position.factory(
          Vector3.factory(
            monsterDB.position.x,
            monsterDB.position.y,
            monsterDB.position.z,
          ),
        ),
        Vector3Value.DEFAULT_FACING_DIRECTION,
        EntityVisualization.factory(0),
      );

      monster.serverId = serverId;
      monsters.set(serverId, monster);
    });

    return monsters;
  }
}
