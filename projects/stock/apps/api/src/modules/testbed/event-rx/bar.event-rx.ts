import { EventRx } from '@nest/base/dist/util/event-manager-rx/event-rx.decorator';
import { EventRxHandler } from '@nest/base/dist/util/event-manager-rx/event-rx.types';
import { Injectable } from '@nestjs/common';
import { EMPTY, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BarEventRx {
  private isFirstTime = true;

  @EventRx({
    type: 'FOO_EVENT_1',
  })
  barEvent1(): EventRxHandler {
    return pipe(
      map(() => {
        if (this.isFirstTime) {
          this.isFirstTime = false;
          return {
            type: 'BAR_EVENT_1',
          };
        }

        return EMPTY;
      })
    );
  }

  @EventRx({
    type: 'BAR_EVENT_1',
  })
  barEvent2(): EventRxHandler {
    return pipe(
      map(() => ({
        type: 'BAR_EVENT_2',
      }))
    );
  }

  @EventRx({
    type: ['BAR_EVENT_1', 'BAR_EVENT_2'],
  })
  barEvent3(): EventRxHandler {
    return pipe(
      map(() => ({
        type: 'BAR_EVENT_3',
      }))
    );
  }

  @EventRx({
    type: ['BAR_EVENT_3'],
  })
  barEvent4(): EventRxHandler {
    return pipe(
      map(() => ({
        type: 'BAR_EVENT_4',
      }))
    );
  }
}
