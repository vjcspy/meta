export class ClientPersist {
  private _sessionId: string;

  constructor(private userId: string) {}

  get sessionId(): string {
    return this._sessionId;
  }

  set sessionId(sessionId: string) {
    this._sessionId = sessionId;
  }

  public isSessionIdValid(sessionId: string): boolean {
    return this._sessionId === sessionId;
  }
}
