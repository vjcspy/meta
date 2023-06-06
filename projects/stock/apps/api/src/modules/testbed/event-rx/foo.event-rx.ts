import { EventRx } from '@nest/base/dist/util/event-manager-rx/event-rx.decorator';
import { EventRxHandler } from '@nest/base/dist/util/event-manager-rx/event-rx.types';
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
      map(() => {
        return {
          type: 'FOO_EVENT_1',
        };
      })
    );
  }
}
