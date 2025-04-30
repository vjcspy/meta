import type { Client } from '@colyseus/core';
import { Room } from '@colyseus/core';

import { LobbyState } from './lobby.state';

export class LobbyRoom extends Room<LobbyState> {
  state = new LobbyState();

  maxClients = 30;

  // Khi room được tạo
  onCreate(_options: any) {
    // Cho phép client gửi “join_lobby” để đăng ký
    this.onMessage('join_lobby', (client: Client, playerName: string) => {
      this.broadcast('player_joined', {
        id: client.sessionId,
        name: playerName,
      });
    });
  }

  // Khi client join
  onJoin(client: Client, options: any, auth: any) {
    console.log(`[Lobby] ${client.sessionId} joined with`, options, auth);
    this.state.createPlayer(client.sessionId);
  }

  // Khi client leave
  onLeave(client: Client) {
    this.state.removePlayer(client.sessionId);
    this.broadcast('player_left', client.sessionId);
  }

  // Khi room không còn client
  onDispose() {
    console.log('[Lobby] Dispose');
  }
}
