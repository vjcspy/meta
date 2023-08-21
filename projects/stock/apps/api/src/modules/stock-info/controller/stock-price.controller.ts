import {
  GetStockPriceHistoryDto,
  StockPriceHistoryResponse,
} from '@modules/stock-info/controller/stock-price.dto';
import { STOCK_PRICE_SYNC } from '@modules/stock-info/observers/stock-price/stock-price.actions';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { StockPriceRepo } from '@modules/stock-info/repo/StockPriceRepo';
import { XAppRequestContext, XLogger } from '@nest/base/dist';
import { EventManagerReactive } from '@nest/base/dist/util/event-manager-rx/EventManager';
import { Controller, Get, Query } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { parse } from 'date-fns';

@Controller('stock-price')
export class StockPriceController {
  private logger: XLogger;

  constructor(
    private readonly eventManager: EventManagerReactive,
    private readonly stockPricePublisher: StockPricePublisher,
    private readonly stockPriceRepo: StockPriceRepo,
    private readonly xAppRequestContext: XAppRequestContext,
  ) {
    this.logger = new XLogger(
      StockPriceController.name,
      this.xAppRequestContext,
    );
  }

  @Get('test')
  test() {
    this.eventManager.dispatch(
      STOCK_PRICE_SYNC({
        code: 'BFC',
        resolve: () => {},
      }),
    );

    return 'ok';
  }

  @Get('sync-all')
  syncAll() {
    this.stockPricePublisher.publish();

    return 'ok';
  }

  @Get('history')
  async history(
    @Query() stockPriceHistoryDto: GetStockPriceHistoryDto,
  ): Promise<StockPriceHistoryResponse[]> {
    const { code, from, to } = stockPriceHistoryDto;
    this.logger.log(`Get History of ${code} from ${from} to ${to}`);
    const fromDate = parse(from, 'yyyy-MM-dd', new Date());
    const toDate = to ? parse(to, 'yyyy-MM-dd', new Date()) : new Date();

    const histories = await this.stockPriceRepo.getHistory(
      code,
      fromDate,
      toDate,
    );

    return plainToInstance(StockPriceHistoryResponse, histories, {
      excludeExtraneousValues: true,
    });
  }
}
