import { JWT } from '@colyseus/auth';
import { Room } from '@colyseus/core';
import type { Player } from '@modules/declaration/scheme';
import { SandboxRoomState } from '@modules/declaration/scheme';

export class MapV1Room extends Room<SandboxRoomState> {
  state = new SandboxRoomState();

  maxClients = 30;

  static async onAuth(token: string, options: any, context: any) {
    // validate the token
    // console.log('Authen with ', token, options, context);
    const userdata = await JWT.verify(token);
    console.log('Userdata ', userdata);
    return userdata;
  }

  onCreate(options: any) {
    // this.setSimulationInterval((deltaTime) => {
    //   this.state.update(deltaTime);
    // });
    console.log('[Sandbox] Room created with options', options);
  }

  onJoin(client: any, options: any, auth: any) {
    const userId = auth.id;
    console.log('UserId', userId);
    const isAlreadyJoined = this.state.players.values().some((p: Player) => {
      console.log('compare player', p.id);
      return p.id === userId;
    });

    if (isAlreadyJoined) {
      console.log(
        `[Sandbox] ${userId} already joined! Kicking duplicate session.`,
      );
      client.leave(1000, 'You are already connected.');
      return;
    }

    console.log(`[Sandbox] ${client.sessionId} joined with`, options, auth);
    this.state.createPlayer(client.sessionId, userId); // nên lưu userId để check trùng lặp
  }

  onLeave(client: any) {
    console.log(`[Sandbox] ${client.sessionId} left`);
    this.state.removePlayer(client.sessionId);
    this.broadcast('player_left', client.sessionId);
  }

  onDispose() {
    console.log('[Sandbox] Dispose');
  }
}
