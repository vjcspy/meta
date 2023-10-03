import { prisma } from '@modules/core/util/prisma';
import { CorResponse } from '@modules/stock-info/controller/cor.dto';
import { SyncTicksHelper } from '@modules/stock-info/helper/sync-ticks.helper';
import { COR_START_SYNC_ACTION } from '@modules/stock-info/observers/cor/cor.actions';
import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';
import { SyncTicksPublisher } from '@modules/stock-info/queue/publisher/sync-ticks.publisher';
import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import { EventManagerReactive } from '@nest/base';
import { Controller, Get } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as moment from 'moment/moment';

@Controller('cor')
export class CorController {
  constructor(
    private readonly eventManager: EventManagerReactive,
    private readonly omPublisher: OrderMatchingPublisher,
    private readonly syncTicksHelper: SyncTicksHelper,
    private readonly syncTicksPublisher: SyncTicksPublisher,
    private readonly corRepo: CorRepo,
  ) {}

  @Get('sync')
  syncCor(): string {
    this.eventManager.dispatch(COR_START_SYNC_ACTION);

    return 'ok';
  }

  @Get('test')
  async test() {
    // const { data } = await firstValueFrom(
    //   this.stockPriceRequest.getPrice('BFC')
    // );

    return this.eventManager.dispatch({
      type: 'FOO_EVENT_1',
    });
  }

  @Get('clear-syncs-status-fail')
  async clear() {
    return prisma.syncStatus.deleteMany({
      where: {
        date: moment().toDate(),
        is_success: {
          not: true,
        },
      },
    });
  }

  @Get('sync-ticks')
  async syncTicks() {
    await this.syncTicksHelper.syncTicks('ACB');

    return 'ok';
  }

  @Get('sync-all-ticks')
  async syncAllTicks() {
    await this.syncTicksPublisher.publish();

    return 'ok';
  }

  @Get('get-all')
  async getAllCors() {
    const cors = this.corRepo.getAll();

    return plainToInstance(CorResponse, cors, {
      excludeExtraneousValues: true,
    });
  }
}
