export interface IClientPersistSession {
  sessionId: string;
  roomId: string;
  mapId?: string;
}

export interface IClientPersist {
  userId: string;
  currentSession?: IClientPersistSession;
}
