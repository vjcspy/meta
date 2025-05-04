import { JWT } from '@colyseus/auth';
import { Room } from '@colyseus/core';
import type { AuthContext, Client } from '@colyseus/core/build/Transport';
import type { UserData } from '@modules/auth/auth-impl';
import { ClientPersistManager } from '@modules/core/client/client-persist-manager';
import type {
  MapData,
  MapMetadata,
  MapOptions,
  MapPresenceMessage,
} from '@modules/declaration/types/map';
import { MapId } from '@modules/declaration/values/map-id';
import { logger } from '@modules/util/logger';

export abstract class MapBaseRom<T extends object> extends Room<T> {
  protected clientPersistManager: ClientPersistManager =
    ClientPersistManager.getInstance();

  private static ROOM_EVENT_FORCE_DISCONNECT = 'force-disconnect';

  // ==========================
  // 🔹 Map Logic
  // ==========================
  protected async getMapData(mapId: string): Promise<MapData> {
    switch (mapId) {
      case MapId.SANDBOX:
        return {
          id: MapId.SANDBOX,
          name: 'Sandbox',
          npcs: [],
          monsters: [
            {
              id: 'dummy_bug',
              position: {
                x: 0,
                y: 0,
                z: 0,
              },
            },
          ],
        };
      default:
        console.warn(`[MapBaseRom.getMapData] MapId ${mapId} is not supported`);
        return null;
    }
  }

  // ==========================
  // 🔹 Redis event
  // ==========================
  protected publishEvent(event: MapPresenceMessage) {
    this.presence.publish(`room:${this.roomId}`, JSON.stringify(event));
  }

  protected publishEventToRoom(roomId: string, event: MapPresenceMessage) {
    this.presence.publish(`room:${roomId}`, JSON.stringify(event));
  }

  protected subscribeEvent(eventHandler: (event: MapPresenceMessage) => void) {
    const { roomId } = this;
    this.presence.subscribe(`room:${roomId}`, (messageStr: string) => {
      logger.log(
        `[MapBaseRom.Event] Received event from room ${roomId}:`,
        messageStr,
      );
      const message: MapPresenceMessage = JSON.parse(messageStr);
      eventHandler(message);
    });
  }

  private registerEventHandler() {
    // Disconnect client if it is already in another room
    this.subscribeEvent((message: MapPresenceMessage) => {
      if (message.type === MapBaseRom.ROOM_EVENT_FORCE_DISCONNECT) {
        const targetClient = this.clients.find(
          (c) => c.sessionId === message.payload,
        );
        if (targetClient) {
          logger.log(
            `[MapBaseRom.Event] Force disconnecting client: ${targetClient.sessionId}`,
          );
          targetClient.leave(1000);
        }
      }
    });
  }

  // ==========================
  // 🔹 Lifecycle methods
  // ==========================
  onCreate(options: MapOptions) {
    logger.log(
      `[MapBaseRom.onCreate] Create new room with id=${this.roomId} with options`,
      options,
    );
    this.setMetadata({
      mapId: options.mapId,
      creatorId: options.creatorId,
    } as MapMetadata);

    this.registerEventHandler();
  }

  async onAuth(client: Client, options: MapOptions, context: AuthContext) {
    const userdata: UserData = await JWT.verify(context.token);
    logger.log('[MapBaseRom.onAuth] Verified user data', userdata);

    // Check if the user is already in a different room
    if (userdata?.id) {
      const clientPersist = await this.clientPersistManager.getClientPersist(
        userdata.id,
      );
      if (clientPersist && clientPersist.currentSession) {
        logger.log(
          `[MapBaseRom.onAuth] Client already connected with session`,
          clientPersist.currentSession,
        );
        const { currentSession } = clientPersist;
        if (currentSession.sessionId !== client.sessionId) {
          logger.log(
            "[MapBaseRom.onAuth] Current session doesn't match will trigger to disconnect last session",
          );
          this.publishEventToRoom(currentSession.roomId, {
            type: MapBaseRom.ROOM_EVENT_FORCE_DISCONNECT,
            payload: currentSession.sessionId,
          });
        }
      }
    }

    return userdata;
  }

  onJoin(client: any, options: MapOptions, auth: UserData) {
    logger.log(
      `[MapBaseRom.onJoin] Client ${client.sessionId} joined room ${this.roomId}`,
      options,
    );
    this.clientPersistManager.setClientPersist(auth.id, {
      userId: auth.id,
      currentSession: {
        sessionId: client.sessionId,
        roomId: this.roomId,
        mapId: options.mapId,
      },
    });
  }

  async onLeave(client: any, consented?: boolean) {
    const userdata: UserData = client.auth;

    if (!userdata?.id) {
      console.error('[MapBaseRom.onLeave] User data is not available');
    }

    logger.log(`[MapBaseRom.onLeave] Client with id ${userdata.id} left room`);
    const clientPersist = await this.clientPersistManager.getClientPersist(
      userdata.id,
    );

    if (clientPersist?.currentSession.sessionId === client.sessionId) {
      logger.log(
        `[MapBaseRom.onLeave] Resetting client persist for userId ${userdata.id} and sessionId ${client.sessionId}`,
      );
      this.clientPersistManager.setClientPersist(userdata.id, {
        userId: userdata.id,
        currentSession: null,
      });
    } else {
      console.warn('[MapBaseRom.onLeave] User data is not valid to reset');
    }
  }

  onDispose(): void | Promise<any> {
    this.presence.unsubscribe(`room:${this.roomId}`);
  }
}
