import { OkResponse } from '@modules/core/model/ok-response';
import { GetMarketTickActionRequest } from '@modules/stock-trading/controller/market-tick.action.dto';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { TickActionDayAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-day-analyze.helper';
import { MarketTickActionConsumer } from '@modules/stock-trading/queue/consumer/market-tick-action.consumer';
import { MarketTickAnalyzeHistoryConsumer } from '@modules/stock-trading/queue/consumer/market-tick-analyze-history.consumer';
import { MarketTickActionAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-analyze.publisher';
import { MarketTickActionDayAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-day-analyze.publisher';
import { MarketTickHistoryAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-history-analyze.publisher';
import { Controller, Get, Query } from '@nestjs/common';
import * as moment from 'moment/moment';

@Controller('market-tick-action')
export class MarketTickActionController {
  constructor(
    private tickActionAnalyzeHelper: TickActionAnalyzeHelper,
    private readonly marketTickAnalyzePublisher: MarketTickActionAnalyzePublisher,
    private readonly marketTickHistoryAnalyzePublisher: MarketTickHistoryAnalyzePublisher,
    private readonly marketTickActionConsumer: MarketTickActionConsumer,
    private readonly marketTickAnalyzeConsumer: MarketTickAnalyzeHistoryConsumer,
    private readonly actionDayAnalyzePublisher: MarketTickActionDayAnalyzePublisher,
    private readonly actionDayAnalyzeHelper: TickActionDayAnalyzeHelper,
  ) {}

  /**
   * Hiện tại không sử dụng nữa
   * @deprecated
   * @returns {OkResponse}
   */
  @Get('build-info-last-10days')
  buildLast10Day() {
    for (let i = 0; i < 15; i++) {
      this.marketTickActionConsumer.pubSubHandler(
        moment.utc().subtract(i, 'day').format('YYYY-MM-DD'),
      );
    }
    // this.marketTickActionConsumer.pubSubHandler('2023-12-25');
    // this.marketTickActionConsumer.pubSubHandler('2023-12-26');
    // this.marketTickActionConsumer.pubSubHandler('2023-12-27');
    // this.marketTickActionConsumer.pubSubHandler('2023-12-28');
    // this.marketTickActionConsumer.pubSubHandler('2024-01-23');

    return new OkResponse();
  }

  @Get('tick-test-all')
  tickTestAll() {
    this.marketTickAnalyzePublisher.publish();
  }

  /**
   * Generate history avg data để lấy so sánh với ngày hiện tại
   */
  @Get('history-test-all')
  historyTestAll() {
    this.marketTickHistoryAnalyzePublisher.publish();
  }

  /**
   * Hiện tại không sử dụng nữa
   *
   * @deprecated
   */
  @Get('day-test-all')
  dayTestAll() {
    this.actionDayAnalyzePublisher.publish();
  }

  @Get('day-test-one')
  dayTestOne() {
    this.actionDayAnalyzeHelper.runOneTimePerDayWithCheckJobInfo(
      moment.utc().format('YYYY-MM-DD'),
    );
  }

  @Get('build-history-today')
  testHistoryOne() {
    this.tickActionAnalyzeHelper.analyzeHistoryDataForDate(
      moment().format('YYYY-MM-DD'),
    );
    this.tickActionAnalyzeHelper.analyzeHistoryDataForDate(
      moment().subtract(1, 'day').format('YYYY-MM-DD'),
    );
  }

  /**
   * Trả về tick action đã analyze theo phút và giao dịch trung bình ngày trước liền kề
   * @param request
   * @returns {Promise<OkResponse>}
   */
  @Get('intra-day-speed')
  async history(
    @Query() request: GetMarketTickActionRequest,
  ): Promise<OkResponse> {
    const data = await this.tickActionAnalyzeHelper.getHistoryDataForDate(
      request.symbol,
      request.date,
    );

    return new OkResponse(undefined, data);
  }

  @Get('tick-day-analyze-one-min')
  runEveryMinutePerDay() {
    this.actionDayAnalyzeHelper.runEveryMinutePerDay(
      moment.utc().format('YYYY-MM-DD'),
    );

    return new OkResponse();
  }
}
