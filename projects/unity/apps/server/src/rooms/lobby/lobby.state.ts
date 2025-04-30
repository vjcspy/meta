import { MapSchema, Schema, type } from '@colyseus/schema';
import { Player } from '@modules/declaration/gameobject/player/player.schema';

export class LobbyState extends Schema {
  @type({ map: Player })
  players = new MapSchema<Player>();

  createPlayer(sessionId: string) {
    this.players.set(sessionId, new Player());
  }

  removePlayer(sessionId: string) {
    this.players.delete(sessionId);
  }
}
