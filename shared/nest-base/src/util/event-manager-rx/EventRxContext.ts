import { Injectable, Scope } from '@nestjs/common';

import { AbstractContext } from '../context/AbstractContext';

@Injectable({
  scope: Scope.TRANSIENT,
})
export class EventRxContext extends AbstractContext {
  public toJSON() {
    return { xCorrelationId: this.xCorrelationId };
  }
}
