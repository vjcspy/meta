import {
  GetStockPriceHistoryDto,
  StockPriceHistoryResponse,
} from '@modules/stock-info/controller/stock-price.dto';
import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { STOCK_PRICE_SYNC } from '@modules/stock-info/observers/stock-price/stock-price.actions';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { StockPriceRepo } from '@modules/stock-info/repo/StockPriceRepo';
import { EventManagerReactive, XAppRequestContext, XLogger } from '@nest/base';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@Controller('stock-price')
export class StockPriceController {
  private logger: XLogger;

  constructor(
    private readonly eventManager: EventManagerReactive,
    private readonly stockPricePublisher: StockPricePublisher,
    private readonly stockPriceRepo: StockPriceRepo,
    private readonly xAppRequestContext: XAppRequestContext,
    private readonly stockPriceHelper: StockPriceHelper,
  ) {
    this.logger = new XLogger(
      StockPriceController.name,
      this.xAppRequestContext,
    );
  }

  @Get('test')
  test(@Query('symbol') symbol: string) {
    if (!symbol) {
      throw new HttpException('Symbol not found', HttpStatus.BAD_REQUEST);
    }

    this.eventManager.dispatch(
      STOCK_PRICE_SYNC({
        code: symbol,
        resolve: () => {},
      }),
    );

    return 'ok';
  }

  @Get('sync-all')
  syncAll() {
    this.stockPricePublisher.publish([], true);

    return 'ok';
  }

  @Get('history')
  async history(
    @Query() stockPriceHistoryDto: GetStockPriceHistoryDto,
  ): Promise<StockPriceHistoryResponse[]> {
    const { code, from, to } = stockPriceHistoryDto;
    this.logger.log(`Get History of ${code} from ${from} to ${to}`);

    const histories = await this.stockPriceHelper.getHistory(code, from, to);

    // @ts-ignore
    return plainToInstance(StockPriceHistoryResponse, histories, {
      excludeExtraneousValues: true,
    });
  }
}
