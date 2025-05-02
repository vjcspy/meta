import { MapSchema, Schema, type } from '@colyseus/schema';

// _______________________________ Base schema class for all game objects _______________________________
export class Vector3 extends Schema {
  @type('number') x: number = 0;

  @type('number') y: number = 0;

  @type('number') z: number = 0; // nên thêm nếu là 3D game
}

export class PlayerVisualization extends Schema {
  @type('uint8') state: number = 0;
}

// _______________________________ GameObject schema class _______________________________
export class Player extends Schema {
  sessionId: string = '';

  @type('string')
  id: string = '';

  @type(Vector3)
  position: Vector3 = new Vector3();

  @type(PlayerVisualization)
  visualization: PlayerVisualization = new PlayerVisualization();
}

// _______________________________ Room schema class _______________________________
export class MapV1State extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  createPlayer(sessionId: string, userId: string) {
    const newPayer = new Player();
    newPayer.id = userId;
    newPayer.sessionId = sessionId;
    console.log(
      `[MapV1State.createPlayer] Player created with sessionId=${sessionId}`,
      newPayer.id,
    );
    if (!this.players.has(sessionId)) {
      this.players.set(sessionId, newPayer);
    } else {
      console.warn(
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
