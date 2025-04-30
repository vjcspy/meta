import { Schema, type } from '@colyseus/schema';

export class PlayerContext extends Schema {
  @type('uint8') state: number = 0;
}

export class PlayerPosition extends Schema {
  @type('number') x: number = 0;

  @type('number') y: number = 0;
}

export class Player extends Schema {
  @type('string') id: string = '';

  @type(PlayerPosition) position: PlayerPosition = new PlayerPosition();

  @type(PlayerContext) context: PlayerContext = new PlayerContext();
}
