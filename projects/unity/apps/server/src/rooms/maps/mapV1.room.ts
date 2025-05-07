import type { Client } from '@colyseus/core/build/Transport';
import type { UserData } from '@modules/auth/auth-impl';
import type { LocalPlayerPayload } from '@modules/declaration/dto/client-message/local-player-payload';
import { MapV1State } from '@modules/declaration/schemas/schema';
import type { MapOptions } from '@modules/declaration/types/map';
import { MapHelper } from '@modules/map/helpers/map.helper';
import { MapMonsterHelper } from '@modules/map/helpers/map-monster.helper';
import { MapBaseRom } from '@modules/map/models/map-base.rom';

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

  patchRate = 1000 / 30;

  async onCreate(options: MapOptions) {
    super.onCreate(options);
    const mapData = await MapHelper.loadMapData(options.mapId);
    if (mapData) {
      this.state.monsters = MapMonsterHelper.buildSchema(mapData.monsters);
      this.setSimulationInterval(this.simulate.bind(this), 1000 / 10);
    } else {
      throw new Error(`Map with id '${options.mapId}' does not exist`);
    }
  }

  onJoin(client: Client, options: MapOptions, auth: UserData) {
    super.onJoin(client, options, auth);

    this.state.createPlayer(client.sessionId, auth.id);
  }

  async onLeave(client: Client, consented?: boolean) {
    await super.onLeave(client, consented);
    this.state.removePlayer(client.sessionId);
    // this.broadcast('player_left', client.sessionId);
  }

  onDispose() {
    console.log('[MapV1Room] Dispose');
  }

  protected registerMessageHandler() {
    this.onMessage<LocalPlayerPayload>(
      MessageType.LOCAL_SYNC,
      (client: Client, data: LocalPlayerPayload) => {
        const player = this.state.players.get(client.sessionId);
        if (!player) return;

        if (!localSyncPayloadValidation(data)) {
          console.warn(
            `[MapV1Room] Invalid ${MessageType.LOCAL_SYNC} payload from ${client.sessionId}`,
          );
          return;
        }

        // // Cập nhật position
        player.position.value.x = data.position.x;
        player.position.value.y = data.position.y;
        player.position.value.z = data.position.z;
        player.position.timestamp = data.position.timestamp;

        if (data.facingDirection) {
          player.position.facingDirection.x = data.facingDirection.x;
          player.position.facingDirection.y = data.facingDirection.y;
          player.position.facingDirection.z = data.facingDirection.z;
        }

        // Cập nhật animation state
        if (data.animationState !== undefined) {
          player.visualization.state = data.animationState;
        }
      },
    );
  }

  private simulate() {
    this.state.monsters.forEach((monster) => {
      monster.__additionalData.behavior.OnUpdate(monster, this.clock);
    });
  }
}
