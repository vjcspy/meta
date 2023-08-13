import {
  COR_LOAD_NEXT_PAGE,
  COR_LOAD_NEXT_PAGE_ERROR,
  COR_START_SYNC_ACTION,
  COR_SYNC_FINISH,
} from '@modules/stock-info/observers/cor/cor.actions';
import { corGetPageFn } from '@modules/stock-info/observers/cor/fns/corGetPage';
import { Effect } from '@nest/base/dist/util/event-manager-rx/event-rx.decorator';
import { EffectHandler } from '@nest/base/dist/util/event-manager-rx/event-rx.types';
import { Injectable, Logger } from '@nestjs/common';
import { EMPTY, from, map, pipe, switchMap } from 'rxjs';

@Injectable()
export class CorEffects {
  private readonly logger = new Logger(CorEffects.name);

  @Effect({
    type: COR_START_SYNC_ACTION,
  })
  startSyncCor(): EffectHandler {
    return pipe(
      map(() =>
        COR_LOAD_NEXT_PAGE({
          currentPage: 0,
        })
      )
    );
  }

  @Effect({
    type: COR_LOAD_NEXT_PAGE,
  })
  loadNextPage(): EffectHandler {
    return pipe(
      switchMap((action: any) => {
        const currentPage = action?.payload?.currentPage ?? 0;
        this.logger.log(`Starting get cor data page ${currentPage}`, {
          action,
        });
        return from(corGetPageFn(currentPage + 1)).pipe(
          map((data) => {
            if (data && !Number.isNaN(data?.numOfRecords)) {
              if (data?.numOfRecords === 0 || data?.numOfRecords < 50) {
                this.logger.log('Sync cor finish', { action });
                return COR_SYNC_FINISH();
              }

              return COR_LOAD_NEXT_PAGE({
                currentPage: currentPage + 1,
              });
            }
            return COR_LOAD_NEXT_PAGE_ERROR({
              currentPage,
            });
          })
        );
      })
    );
  }

  @Effect({
    type: COR_LOAD_NEXT_PAGE_ERROR,
  })
  whenLoadPageError() {
    return pipe(
      map((action: any) => {
        this.logger.error(
          `Cor load page error page ${action?.payload?.currentPage}`,
          { action }
        );
        return EMPTY;
      })
    );
  }
}
