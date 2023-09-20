import { EventRx, EventRxHandler } from '@nest/base';
import { Injectable, Logger } from '@nestjs/common';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FooEventRx {
  private readonly logger = new Logger();

  @EventRx({
    type: 'EventManagerReactive_INIT',
  })
  fooEvent1(): EventRxHandler {
    return pipe(
      map(() => ({
        type: 'FOO_EVENT_1',
      })),
    );
  }
}
