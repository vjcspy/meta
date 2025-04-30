import { JWT } from '@colyseus/auth';
import { Room } from '@colyseus/core';

import type { LobbyState } from './lobby/lobby.state';

export class BaseAuthRoom extends Room<LobbyState> {
  static async onAuth(token: string, _options: any, _context: any) {
    // validate the token
    const userdata = await JWT.verify(token);

    // return userdata
    return userdata;
  }
}
