import { prisma } from '@modules/core/util/prisma';
import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import type {
  BulkSubmitActionDto,
  StrategyDto,
  StrategyProcessRequest,
  StrategyProcessUpdateDto,
} from '@modules/stock-trading/controller/strategy.dto';
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
import { forEach, includes, map, size } from 'lodash';
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

  async bulkSubmitAction(bulkSubmitData: BulkSubmitActionDto) {
    this.logger.info('bulkSubmitAction');
    const strategy = await this.tradingStrategyRepo.getByHash(
      bulkSubmitData.hash,
      {
        trading_strategy_process: false,
        trading_strategy_action: false,
      },
    );

    if (!strategy) {
      throw new HttpException('hash data incorrect', HttpStatus.BAD_REQUEST);
    }
    this.logger.info(`bulkSubmitAction strategy ${strategy.id}`);
    const buyDataToInsert = bulkSubmitData.buy.map((d) => ({
      symbol: bulkSubmitData.symbol,
      trading_strategy_id: strategy.id,
      type: 1,
      date: moment(d.date).toDate(),
      meta: { price: d.price },
    }));
    try {
      this.logger.info(
        `bulkSubmitAction create many actions for ${strategy.id}`,
      );
      await prisma.tradingStrategyAction.createMany({
        data: [...buyDataToInsert],
      });

      this.logger.info(
        `bulkSubmitAction created many actions for ${strategy.id}`,
      );
    } catch (e) {
      this.logger.error(
        `could not insert strategy '${strategy.id}' action data for symbol '${bulkSubmitData.symbol}'`,
        e,
      );

      throw new HttpException(
        'could not insert strategy action data',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProcessState(data: StrategyProcessUpdateDto) {
    this.logger.info(`updateProcessState`);
    const strategy = await this.tradingStrategyRepo.getByHash(data.hash, {
      trading_strategy_process: false,
      trading_strategy_action: false,
    });

    if (!strategy) {
      throw new HttpException('hash data incorrect', HttpStatus.BAD_REQUEST);
    }

    const process = await prisma.tradingStrategyProcess.findFirst({
      where: {
        trading_strategy_id: strategy.id,
        symbol: data.symbol,
      },
    });

    if (!process) {
      throw new HttpException('not found process', HttpStatus.BAD_REQUEST);
    }
    this.logger.info(
      `updateProcessState update state for process ${process.id} with state ${data.state}`,
    );
    await prisma.tradingStrategyProcess.update({
      where: {
        id: process.id,
      },
      data: {
        state: data.state,
      },
    });
  }

  async retryErrorProcess(data: StrategyProcessRequest) {
    const strategy = await this.tradingStrategyRepo.getByHash(data.hash, {
      trading_strategy_process: true,
      trading_strategy_action: false,
    });

    const errorProcesses = (strategy as any)?.trading_strategy_process.filter(
      (_d) => _d.state === TradingStrategyState.Error,
    );

    this.logger.info('Will change error process to pending state');
    await prisma.tradingStrategyProcess.updateMany({
      where: {
        trading_strategy_id: strategy.id,
        state: TradingStrategyState.Error,
      },
      data: {
        state: TradingStrategyState.Pending,
      },
    });

    // remove existed actions
    await prisma.tradingStrategyAction.deleteMany({
      where: {
        trading_strategy_id: strategy.id,
        symbol: {
          in: map(errorProcesses, (d) => d.symbol),
        },
      },
    });

    const connection = this.connectionManager.getConnection();

    this.logger.info(`Will publish ${size(errorProcesses)} strategy process`);
    if (Array.isArray(errorProcesses)) {
      forEach(errorProcesses, (process) => {
        connection.publish(
          STOCK_TRADING_EXCHANGE_KEY,
          STOCK_TRADING_STRATEGY_ROUTING_KEY,
          {
            hash: data.hash,
            symbol: process.symbol,
            meta: process.meta,
            state: process.state,
          },
        );
      });
      this.logger.info(`Published ${size(errorProcesses)} strategy process`);
    }
  }
}
