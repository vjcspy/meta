import { OkResponse } from '@modules/core/model/ok-response';
import type { StockPriceHistoryResponse } from '@modules/stock-info/controller/stock-price.dto';
import {
  GetStockPriceHistoryDto,
  SimpleStockPriceHistoryResponse,
} from '@modules/stock-info/controller/stock-price.dto';
import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { SyncSimpleStockPrice } from '@modules/stock-info/helper/sync-simple-stock-price';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { LiveRequest } from '@modules/stock-trading/requests/live/live.request';
import { XAppRequestContext, XLogger } from '@nest/base';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { forEach } from 'lodash';

@Controller('stock-price')
export class StockPriceController {
  private logger: XLogger;

  constructor(
    private readonly stockPricePublisher: StockPricePublisher,
    private readonly xAppRequestContext: XAppRequestContext,
    private readonly stockPriceHelper: StockPriceHelper,
    private readonly syncSimpleStockPrice: SyncSimpleStockPrice,
    private readonly liveRequest: LiveRequest,
  ) {
    this.logger = new XLogger(
      StockPriceController.name,
      this.xAppRequestContext,
    );
  }

  @Get('test-sync-simple')
  testSyncSimple(@Query('symbol') symbol: string) {
    if (!symbol) {
      throw new HttpException('Symbol not found', HttpStatus.BAD_REQUEST);
    }

    this.syncSimpleStockPrice.syncSimpleStockPrice(symbol);

    return new OkResponse();
  }

  @Get('sync-all')
  syncAll() {
    this.stockPricePublisher.publish([], true);

    return 'ok';
  }

  @Get('sync-all-current')
  syncAllCurrent() {
    this.stockPricePublisher.publish([], false);

    return 'ok';
  }

  @Get('sync-all-default-cat')
  async syncAllDefaultCat() {
    const defaultCat = await this.liveRequest.getDefaultCat();
    forEach(defaultCat?.symbols, (symbol: string) => {
      this.stockPricePublisher.publishOne(symbol, true);
    });
    this.stockPricePublisher.publishOne(StockInfoValue.VNINDEX_CODE, true);
    return 'ok';
  }

  // @Get('history')
  // async history(
  //   @Query() stockPriceHistoryDto: GetStockPriceHistoryDto,
  // ): Promise<StockPriceHistoryResponse[]> {
  //   const { code, from, to } = stockPriceHistoryDto;
  //   this.logger.log(`Get History of ${code} from ${from} to ${to}`);
  //
  //   const histories = await this.stockPriceHelper.getHistory(code, from, to);
  //
  //   // @ts-ignore
  //   return plainToInstance(StockPriceHistoryResponse, histories, {
  //     excludeExtraneousValues: true,
  //   });
  // }
  //
  @Get('histories')
  async histories(
    @Query() stockPriceHistoryDto: GetStockPriceHistoryDto,
  ): Promise<StockPriceHistoryResponse[]> {
    return this.simpleHistories(stockPriceHistoryDto);
  }

  @Get('simple-histories')
  async simpleHistories(
    @Query() stockPriceHistoryDto: GetStockPriceHistoryDto,
  ): Promise<StockPriceHistoryResponse[]> {
    const { code, from, to } = stockPriceHistoryDto;
    this.logger.log(
      `Get Simple price history of ${code} from ${from} to ${to}`,
    );

    const histories = await this.stockPriceHelper.getSimpleHistory(
      code,
      from,
      to,
    );

    // @ts-ignore
    return new OkResponse(
      undefined,
      plainToInstance(SimpleStockPriceHistoryResponse, histories, {
        excludeExtraneousValues: true,
      }),
    );
  }
}
