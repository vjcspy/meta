import type { IClientPersist } from '@modules/core/client/client-persist';
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

  setClientPersist(userId: string, clientPersist: IClientPersist): void {
    this._presence.set(
      `client-persist:${userId}`,
      JSON.stringify(clientPersist),
    );
  }

  getClientPersist(userId: string): IClientPersist | null {
    const clientPersist = this._presence.get(`client-persist:${userId}`);
    if (clientPersist) {
      return JSON.parse(clientPersist);
    }
    return null;
  }
}
