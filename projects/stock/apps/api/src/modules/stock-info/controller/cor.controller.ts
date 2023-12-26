import { OkResponse } from '@modules/core/model/ok-response';
import { prisma } from '@modules/core/util/prisma';
import {
  CorResponse,
  GetSymbolInfoQuery,
  SymbolInfoResponse,
} from '@modules/stock-info/controller/cor.dto';
import { SyncTicksHelper } from '@modules/stock-info/helper/sync-ticks.helper';
import { COR_START_SYNC_ACTION } from '@modules/stock-info/observers/cor/cor.actions';
import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';
import { SyncTicksPublisher } from '@modules/stock-info/queue/publisher/sync-ticks.publisher';
import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import { EventManagerReactive, XLogger } from '@nest/base';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as moment from 'moment/moment';

@Controller('cor')
export class CorController {
  private readonly logger = new XLogger(CorController.name);

  constructor(
    private readonly eventManager: EventManagerReactive,
    private readonly omPublisher: OrderMatchingPublisher,
    private readonly syncTicksHelper: SyncTicksHelper,
    private readonly syncTicksPublisher: SyncTicksPublisher,
    private readonly corRepo: CorRepo,
  ) {}

  @Get('sync')
  async syncCor() {
    this.logger.info('Remove all cor before sync');
    await prisma.cor_entity.deleteMany();
    this.eventManager.dispatch(COR_START_SYNC_ACTION);

    return new OkResponse();
  }

  @Get('info')
  async getInfo(@Query() infoQuery: GetSymbolInfoQuery) {
    const info = await this.corRepo.getOne(infoQuery.symbol);

    if (!info) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(SymbolInfoResponse, info, {
      excludeExtraneousValues: true,
    });
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
  async syncTicks(@Query() infoQuery: GetSymbolInfoQuery) {
    await this.syncTicksHelper.syncTicks(infoQuery.symbol);

    return 'ok';
  }

  @Get('sync-all-ticks')
  async syncAllTicks() {
    this.logger.info('Start sync all ticks');
    await this.syncTicksPublisher.publish();

    return 'ok';
  }

  @Get('get-all')
  async getAllCors() {
    const cors = await this.corRepo.getAll();

    return plainToInstance(CorResponse, cors, {
      excludeExtraneousValues: true,
    });
  }

  @Get('get-all-v1')
  async getAllCorsV1() {
    const cors = await this.corRepo.getAll();

    return new OkResponse(undefined, {
      cors: plainToInstance(CorResponse, cors, {
        excludeExtraneousValues: true,
      }),
    });
  }
}
