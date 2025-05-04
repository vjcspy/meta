export type ClientPersistSession = {
  sessionId: string;
  roomId: string;
  mapId?: string;
};

export type ClientPersist = {
  userId: string;
  currentSession?: ClientPersistSession;
};
