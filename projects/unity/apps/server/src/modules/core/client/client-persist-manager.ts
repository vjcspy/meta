import type { ClientPersist } from '@modules/core/client/client-persist';

export class ClientPersistManager {
  private static _clients = new Map<string, ClientPersist>();

  static getClient(userId: string): ClientPersist | null {
    if (this._clients.has(userId)) {
      return this._clients.get(userId);
    }
    return null;
  }
}
