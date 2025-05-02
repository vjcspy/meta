import { JWT } from '@colyseus/auth';
import { Room } from '@colyseus/core';
import type { AuthContext, Client } from '@colyseus/core/build/Transport';
import type { UserData } from '@modules/auth/auth-impl';
import { ClientPersistManager } from '@modules/core/client/client-persist-manager';
import type {
  MapMetadata,
  MapOptions,
  MapPresenceMessage,
} from '@modules/declaration/map';

export abstract class MapBaseRom<T extends object> extends Room<T> {
  protected clientPersistManager: ClientPersistManager =
    ClientPersistManager.getInstance();

  private static ROOM_EVENT_FORCE_DISCONNECT = 'force-disconnect';

  protected publishEvent(event: MapPresenceMessage) {
    this.presence.publish(`room:${this.roomId}`, JSON.stringify(event));
  }

  protected subscribeEvent(eventHandler: (event: MapPresenceMessage) => void) {
    this.presence.subscribe(`room:${this.roomId}`, (messageStr: string) => {
      const message: MapPresenceMessage = JSON.parse(messageStr);
      eventHandler(message);
    });
  }

  onCreate(options: MapOptions) {
    this.setMetadata({
      mapId: options.mapId,
      creatorId: options.creatorId,
    } as MapMetadata);

    this.subscribeEvent((message: MapPresenceMessage) => {
      if (message.type === MapBaseRom.ROOM_EVENT_FORCE_DISCONNECT) {
        const targetClient = this.clients.find(
          (c) => c.sessionId === message.payload,
        );
        if (targetClient) {
          console.log(`Force disconnecting client: ${targetClient.sessionId}`);
          targetClient.leave(1000);
        }
      }
    });
  }

  async onAuth(client: Client, options: MapOptions, context: AuthContext) {
    const userdata: UserData = await JWT.verify(context.token);
    console.log('Verified user data', userdata);

    // Check if the user is already in a different room
    if (userdata?.id) {
      const clientPersistManager = ClientPersistManager.getInstance();
      const clientPersist = clientPersistManager.getClientPersist(userdata.id);
      if (clientPersist && clientPersist.currentSession) {
        const { currentSession } = clientPersist;
        if (currentSession.roomId !== this.roomId) {
          this.publishEvent({
            type: MapBaseRom.ROOM_EVENT_FORCE_DISCONNECT,
            payload: client.sessionId,
          });
        }
      }
    }

    return userdata;
  }

  onJoin(client: any, options: MapOptions, auth: UserData) {
    this.clientPersistManager.setClientPersist(auth.id, {
      userId: auth.id,
      currentSession: {
        sessionId: client.sessionId,
        roomId: this.roomId,
        mapId: options.mapId,
      },
    });
  }
}
