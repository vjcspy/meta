import { AbstractContext } from '../context/AbstractContext';

export class EventRxContext extends AbstractContext {
  public toJSON() {
    return {
      xCorrelationId: this.getXCorrelationId(),
      contextType: 'eventRx',
    };
  }
}
