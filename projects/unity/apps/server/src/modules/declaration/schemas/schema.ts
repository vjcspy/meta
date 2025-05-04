import { MapSchema, Schema, type } from '@colyseus/schema';
import type {
  MonsterAdditionalData,
  PlayerAdditionalData,
} from '@modules/declaration/types/map';
import { Vector3Value } from '@modules/declaration/values/entity';
import { logger } from '@modules/utils/logger';

// _______________________________ Base schema class for all game objects _______________________________
export class Vector3 extends Schema {
  @type('number') x: number = 0;

  @type('number') y: number = 0;

  @type('number') z: number = 0; // nên thêm nếu là 3D game

  public static factory(x: number, y: number, z: number): Vector3 {
    const vector3 = new Vector3();
    vector3.x = x;
    vector3.y = y;
    vector3.z = z;

    return vector3;
  }
}

export class EntityVisualization extends Schema {
  @type('uint8') state: number = 0;

  public static factory(state: number): EntityVisualization {
    const i = new EntityVisualization();
    i.state = state;

    return i;
  }
}

export class Position extends Schema {
  @type(Vector3)
  value: Vector3 = new Vector3();

  @type(Vector3)
  facingDirection: Vector3 = new Vector3();

  @type('number')
  timestamp: number = 0; // milliseconds

  public static factory(value: Vector3): Position {
    const i = new Position();
    i.value = value;
    i.facingDirection = Vector3Value.DEFAULT_FACING_DIRECTION;
    return i;
  }
}

export class SyncObject extends Schema {
  // id trong database, giá trị này không thay đổi
  @type('string')
  id: string = '';

  // client can create this id
  @type('string')
  clientSyncId: string = '';

  // server can create this id to sync with client
  @type('string')
  serverSyncId: string = '';

  @type(Position)
  position: Position = new Position();
}

export class EntityGameObject extends SyncObject {
  @type(EntityVisualization)
  visualization: EntityVisualization = new EntityVisualization();
}

/**
 * _______________________________ GameObject schema class _______________________________
 *
 * Quyết định dùng luôn object này làm state của gameObject, vì cơ bản nó đã chứa state để sync
 * Ngoài ra, nó còn có các additional state, for example, we have a lot of different monsters, and each type has it own state
 */
export class Player extends EntityGameObject {
  __additionalData: PlayerAdditionalData;
}

export class Monster extends EntityGameObject {
  public static factory(
    id: string,
    position: Position,
    facingDirection: Vector3,
    visualization: EntityVisualization,
  ): Monster {
    const i = new Monster();
    i.id = id;
    i.position = position;
    i.visualization = visualization;
    return i;
  }

  __additionalData: MonsterAdditionalData;
}

// _______________________________ Room schema class _______________________________
export class MapV1State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  @type({ map: Monster })
  monsters = new MapSchema<Monster>();

  createPlayer(sessionId: string, userId: string) {
    const newPayer = new Player();
    newPayer.id = userId;
    newPayer.__additionalData = { ...newPayer.__additionalData, sessionId };
    logger.info(
      `[MapV1State.createPlayer] Player created with sessionId=${sessionId}`,
      newPayer.id,
    );
    if (!this.players.has(sessionId)) {
      this.players.set(sessionId, newPayer);
    } else {
      logger.warn(
        '[MapV1State.createPlayer] Player already exists with sessionId=',
        sessionId,
      );
    }
  }

  removePlayer(sessionId: string) {
    logger.log(
      `[MapV1State.removePlayer] Client with sessionId=${sessionId} left`,
    );
    if (this.players.has(sessionId)) {
      this.players.delete(sessionId);
    } else {
      logger.warn(
        `[MapV1State.removePlayer] Player with sessionId=${sessionId} does not exist to remove`,
      );
    }
  }
}
