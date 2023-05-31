import { EventRx } from '@nest/base/dist/util/event-manager-rx/event-rx.decorator';
import { EventRxHandler } from '@nest/base/dist/util/event-manager-rx/event-rx.types';
import { Injectable, Logger } from '@nestjs/common';
import { EMPTY, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class BarEventRx {
  private readonly logger = new Logger(BarEventRx.name);
  private isFirstTime = true;
  @EventRx({
    type: 'FOO_EVENT_1',
  })
  barEvent1(): EventRxHandler {
    return pipe(
      map((action) => {
        this.logger.log(`process action barEvent1 ${JSON.stringify(action)}`);

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
      map((action) => {
        this.logger.log(`process action barEvent2 ${JSON.stringify(action)}`);

        return {
          type: 'BAR_EVENT_2',
        };
      })
    );
  }
  @EventRx({
    type: ['BAR_EVENT_1', 'BAR_EVENT_2'],
  })
  barEvent3(): EventRxHandler {
    return pipe(
      map((action) => {
        this.logger.log(`process action barEvent3 ${JSON.stringify(action)}`);

        return {
          type: 'BAR_EVENT_3',
        };
      })
    );
  }
}
