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
  @type('string')
  id: string = '';

  @type(Vector3)
  position: Vector3 = new Vector3();

  @type(PlayerVisualization)
  visualization: PlayerVisualization = new PlayerVisualization();
}

// _______________________________ Room schema class _______________________________
export class SandboxRoomState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  createPlayer(sessionId: string, id: string) {
    const newPayer = new Player();
    newPayer.id = id;
    console.log('New player created', newPayer.id);
    this.players.set(sessionId, newPayer);
  }

  removePlayer(sessionId: string) {
    this.players.delete(sessionId);
  }
}

export class MapState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  createPlayer(sessionId: string) {
    this.players.set(sessionId, new Player());
  }

  removePlayer(sessionId: string) {
    this.players.delete(sessionId);
  }
}
