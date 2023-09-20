import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import type { StrategyDto } from '@modules/stock-trading/controller/strategy.dto';
import type { TradingStrategyProcessSchema } from '@modules/stock-trading/model/trading-strategy.model';
import { TradingStrategyState } from '@modules/stock-trading/model/trading-strategy.model';
import { TradingStrategyRepo } from '@modules/stock-trading/repo/trading-strategy.repo';
import {
  STOCK_TRADING_EXCHANGE_KEY,
  STOCK_TRADING_STRATEGY_ROUTING_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { HttpException, HttpStatus, Injectable, Scope } from '@nestjs/common';
import { forEach, includes, size } from 'lodash';
import * as moment from 'moment';

@Injectable({
  scope: Scope.DEFAULT,
})
export class TradingStrategyHelper {
  private readonly logger: XLogger = new XLogger(TradingStrategyHelper.name);

  constructor(
    private readonly tradingStrategyRepo: TradingStrategyRepo,
    private readonly corRepo: CorRepo,
    private readonly connectionManager: AmqpConnectionManager,
  ) {}

  /**
   * To generate trading strategy and each symbol's process
   *
   * @param strategyDto
   * @returns {Promise<void>}
   */
  async processStrategy(strategyDto: StrategyDto) {
    const existed = await this.tradingStrategyRepo.getByHash(
      strategyDto.hash_key,
    );
    if (existed) {
      this.logger.info(
        `Strategy already exists for hash ${strategyDto.hash_key}`,
      );
      throw new HttpException('Strategy already exists', HttpStatus.CONFLICT);
    }

    // init strategy and it's process
    let symbols = await this.corRepo.getAll();

    if (
      strategyDto?.meta &&
      strategyDto.meta.hasOwnProperty('allowable_list') &&
      Array.isArray(strategyDto.meta.allowable_list)
    ) {
      symbols = symbols.filter((symbol) =>
        includes(strategyDto.meta.allowable_list, symbol.code),
      );
    }

    const tradingStrategyProcess: TradingStrategyProcessSchema[] = [];
    forEach(symbols, (symbol) => {
      tradingStrategyProcess.push({
        state: TradingStrategyState.Pending,
        symbol: symbol.code,
      });
    });

    try {
      await this.tradingStrategyRepo.create(
        {
          name: strategyDto.strategy_name,
          hash: strategyDto.hash_key,
          input: strategyDto.strategy_input,
          from: moment.utc(strategyDto.from_date).toDate(),
          to: moment.utc(strategyDto.to_date).toDate(),
          state: TradingStrategyState.Pending,
          meta: strategyDto?.meta,
        },
        tradingStrategyProcess,
      );
    } catch (e) {
      this.logger.error('Error when create strategy & process into DB', e);
    }

    // publish job
    const strategy = await this.tradingStrategyRepo.getByHash(
      strategyDto.hash_key,
      {
        trading_strategy_process: true,
        trading_strategy_action: false,
      },
    );
    const processes = (strategy as any)?.trading_strategy_process;
    const connection = this.connectionManager.getConnection();

    this.logger.info(`Will publish ${size(processes)} strategy process`);

    if (Array.isArray(processes)) {
      forEach(processes, (process) => {
        connection.publish(
          STOCK_TRADING_EXCHANGE_KEY,
          STOCK_TRADING_STRATEGY_ROUTING_KEY,
          {
            hash: strategyDto.hash_key,
            symbol: process.symbol,
            meta: process.meta,
            state: process.state,
          },
        );
      });
      this.logger.info(`Published ${size(processes)} strategy process`);
    }
  }
}
