import { DataObject } from 'chitility';
import { v4 as uuidv4 } from 'uuid';

export enum CorrelationType {
  'REQUEST' = 're',
  'CONSUMER' = 'co',
  'EVENT_RX' = 'rx',
}

export class AbstractContext extends DataObject {
  '_x-correlation-id': string;

  isUserContext: boolean = false;

  getXCorrelationId(): string {
    return this['_x-correlation-id'];
  }

  setXCorrelationId(value: string): AbstractContext {
    this['_x-correlation-id'] = value;

    return this;
  }

  markAsUserContext(isUserContext: boolean = true): AbstractContext {
    this.isUserContext = isUserContext;

    return this;
  }

  refreshXCorrelationId(type: CorrelationType) {
    this.setXCorrelationId(`${type}-${uuidv4()}`);

    return this;
  }

  isUserRequest(): boolean {
    return this.isUserContext;
  }
}
