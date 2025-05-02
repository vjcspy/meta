import type { Client } from '@colyseus/core/build/Transport';
import type { UserData } from '@modules/auth/auth-impl';
import type { MapOptions } from '@modules/declaration/map';
import { MapV1State } from '@modules/declaration/scheme';

import { MapBaseRom } from '../map-base.rom';
import { MessageType } from './mapV1/message-type';
import { localSyncPayloadValidation } from './mapV1/validations/local-sync-payload.validation';

export class MapV1Room extends MapBaseRom<MapV1State> {
  state = new MapV1State();

  autoDispose: false;

  protected _disposeIfEmpty(): boolean {
    return false;
  }

  // #private: true;

  seatReservationTime = 30;

  maxClients = 50;

  onCreate(options: MapOptions) {
    super.onCreate(options);
    this.registerMessageHandler();
  }

  onJoin(client: any, options: MapOptions, auth: UserData) {
    super.onJoin(client, options, auth);

    this.state.createPlayer(client.sessionId, auth.id);
  }

  async onLeave(client: any, consented?: boolean) {
    await super.onLeave(client, consented);
    this.state.removePlayer(client.sessionId);
    // this.broadcast('player_left', client.sessionId);
  }

  onDispose() {
    console.log('[MapV1Room] Dispose');
  }

  private registerMessageHandler() {
    this.onMessage(MessageType.LOCAL_SYNC, (client: Client, data: any) => {
      const player = this.state.players.get(client.sessionId);
      if (!player) return;

      if (!localSyncPayloadValidation(data)) {
        console.warn(
          `[MapV1Room] Invalid ${MessageType.LOCAL_SYNC} payload from ${client.sessionId}`,
        );
        return;
      }

      // // Cập nhật position
      player.position.x = data.x;
      player.position.y = data.y;
      player.position.z = data.z;

      if (data.facingDirection) {
        player.facingDirection.x = data.facingDirection.x;
        player.facingDirection.y = data.facingDirection.y;
        player.facingDirection.z = data.facingDirection.z;
      }

      // Cập nhật animation state
      if (data.animationState !== undefined) {
        player.visualization.state = data.animationState;
      }
    });
  }
}
