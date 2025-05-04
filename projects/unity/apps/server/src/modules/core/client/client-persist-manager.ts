import type { ClientPersist } from '@modules/declaration/types/client-persist';
import type { Presence } from 'colyseus';
import { matchMaker } from 'colyseus';

export class ClientPersistManager {
  private static _instance: ClientPersistManager;

  private _presence: Presence = matchMaker.presence;

  public static getInstance(): ClientPersistManager {
    if (!ClientPersistManager._instance) {
      ClientPersistManager._instance = new ClientPersistManager();
    }
    return ClientPersistManager._instance;
  }

  setClientPersist(userId: string, clientPersist: ClientPersist): void {
    console.log(
      '[ClientPersistManager] Setting client persist for userId:',
      userId,
      clientPersist,
    );
    this._presence.set(
      `client-persist:${userId}`,
      JSON.stringify(clientPersist),
    );
  }

  async getClientPersist(userId: string): Promise<ClientPersist> {
    const clientPersist = await this._presence.get(`client-persist:${userId}`);
    if (clientPersist) {
      console.log(
        `[ClientPersistManager] Client ${userId} persisted in client persist:`,
        clientPersist,
      );
      return JSON.parse(clientPersist);
    }
    return null;
  }
}
