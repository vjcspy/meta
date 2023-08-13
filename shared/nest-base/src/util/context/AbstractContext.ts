export class AbstractContext {
  private '_x-correlation-id': string;

  get xCorrelationId(): string {
    return this['_x-correlation-id'];
  }

  set xCorrelationId(value: string) {
    this['_x-correlation-id'] = value;
  }
}
