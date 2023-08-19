export class AbstractContext {
  '_x-correlation-id': string;

  isUserContext: boolean = false;

  getXCorrelationId(): string {
    return this['_x-correlation-id'];
  }

  setXCorrelationId(value: string): AbstractContext {
    this['_x-correlation-id'] = value;

    return this;
  }

  markAsUserContext(): AbstractContext {
    this.isUserContext = true;

    return this;
  }

  isUserRequest(): boolean {
    return this.isUserContext;
  }
}
