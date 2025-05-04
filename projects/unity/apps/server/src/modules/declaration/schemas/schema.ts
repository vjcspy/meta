import { MapSchema, Schema, type } from '@colyseus/schema';
import { logger } from '@modules/util/logger';

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

  @type('number')
  timestamp: number = 0; // milliseconds

  public static factory(value: Vector3): Position {
    const i = new Position();
    i.value = value;
    return i;
  }
}

export class GameObject extends Schema {
  @type('string')
  id: string = '';

  @type('string')
  clientId: string = '';

  @type('string')
  serverId: string = '';

  @type(Position)
  position: Position = new Position();
}

export class EntityGameObject extends GameObject {
  @type(EntityVisualization)
  visualization: EntityVisualization = new EntityVisualization();

  @type(Vector3)
  facingDirection: Vector3 = new Vector3();
}

// _______________________________ GameObject schema class _______________________________
export class Player extends EntityGameObject {
  sessionId: string = '';
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
    i.facingDirection = facingDirection;
    i.visualization = visualization;
    return i;
  }
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
    newPayer.sessionId = sessionId;
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
    console.log(
      `[MapV1State.removePlayer] Client with sessionId=${sessionId} left`,
    );
    if (this.players.has(sessionId)) {
      this.players.delete(sessionId);
    } else {
      console.warn(
        `[MapV1State.removePlayer] Player with sessionId=${sessionId} does not exist to remove`,
      );
    }
  }
}
