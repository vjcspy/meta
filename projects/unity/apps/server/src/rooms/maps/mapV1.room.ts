import type { UserData } from '@modules/auth/auth-impl';
import type { MapOptions } from '@modules/declaration/map';
import { MapV1State } from '@modules/declaration/scheme';

import { MapBaseRom } from '../map-base.rom';

export class MapV1Room extends MapBaseRom<MapV1State> {
  state = new MapV1State();

  autoDispose: false;

  protected _disposeIfEmpty(): boolean {
    return false;
  }

  // #private: true;

  seatReservationTime = 30;

  maxClients = 50;

  onJoin(client: any, options: MapOptions, auth: UserData) {
    super.onJoin(client, options, auth);

    this.state.createPlayer(client.sessionId, auth.id);
  }

  onLeave(client: any) {
    this.state.removePlayer(client.sessionId);
    this.broadcast('player_left', client.sessionId);
  }

  onDispose() {
    console.log('[MapV1Room] Dispose');
  }
}
