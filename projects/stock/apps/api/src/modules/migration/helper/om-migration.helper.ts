import { prisma } from '@modules/core/util/prisma';
import { OldMongoHelper } from '@modules/migration/helper/old-mongo.helper';
import {
  MIGRATE_EXCHANGE_KEY,
  MIGRATION_QUEUE_ROUTING_KEY,
} from '@modules/migration/values/queue.value';
import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import { XLogger } from '@nest/base';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';
import { forEach, includes, isEmpty, sortBy } from 'lodash';
import * as moment from 'moment';
import type { Db } from 'mongodb';

@Injectable()
export class OmMigrationHelper {
  private readonly logger = new XLogger(OmMigrationHelper.name);

  private _database: Db;

  constructor(
    private readonly oldMongoService: OldMongoHelper,
    private readonly stockPriceHelper: StockPriceHelper,
    private readonly corRepo: CorRepo,
    private readonly connectionManager: AmqpConnectionManager,
  ) {}

  async doMigrate() {
    const client = this.oldMongoService.getClient();

    if (!client) {
      throw new Error('could not get mongo client');
    }
    const historyRefer = await this.getHistoryRefer();
    const cors = await this.corRepo.getAll();
    const firstTrade = moment.utc('2022-04-14');

    for (let i = 0; i < historyRefer.length; i++) {
      const _priceDay = historyRefer[i];

      for (let j = 0; j < cors.length; j++) {
        const cor = cors[j];

        if (
          !includes(['HOSE', 'HNX'], cor.exchange) ||
          !cor.firstTradeDate ||
          moment.utc(cor.firstTradeDate).isAfter(firstTrade)
        ) {
          // eslint-disable-next-line no-continue
          continue;
        }
        this.connectionManager
          .getConnection()
          .publish(MIGRATE_EXCHANGE_KEY, MIGRATION_QUEUE_ROUTING_KEY, {
            symbol: cor.code,
            date: moment.utc(_priceDay.date).format('YYYY-MM-DD'),
          });
      }
    }
  }

  async migrate(symbol: string, date: string | Date) {
    this.logger.info(
      `WILL migrate ${symbol} ${moment.utc(date).format('YYYY-MM-DD')}`,
    );
    let om1 = await this.getOMData(symbol, date, 1);
    let om0 = await this.getOMData(symbol, date, 0);

    if (!om0 || !om0._id) {
      om0 = await this.getOMData(symbol, date, 0, 'v4');
    }

    if (!om1 || !om1._id) {
      om1 = await this.getOMData(symbol, date, 1, 'v4');
    }

    const dateString = moment.utc(date).format('YYYY-MM-DD');
    const dateObject = moment.utc(date).toDate();

    if (!om0 || !om0._id || !om1 || !om1._id) {
      const error = new Error(
        `Could not found OM for symbol ${symbol} date ${dateString}`,
      );
      this.logger.error(error.message, error);

      throw error;
    }

    const results = [];
    let om0Data = om0?.meta?.data;
    if (Array.isArray(om0Data)) {
      this.logger.info(`WILL migrate data OM0 ${symbol} ${dateString}`);
      om0Data = om0Data.filter(
        (o) => typeof o?.a === 'undefined' || o?.a === '',
      );

      om0Data = sortBy(om0Data, (o: any) => o.t).map((o: any) => {
        const timestamp = this.transformTime(dateObject, o?.t);

        return [timestamp, o?.v, o?.p, 'Undefined'];
      });

      results.push(...om0Data);
    }

    const om1Data = om1?.meta?.data;
    if (Array.isArray(om1Data)) {
      this.logger.info('WILL transform OM1Data');
      forEach(om1Data, (o: any) => {
        const timestamp = this.transformTime(dateObject, o?.t);
        let action: string;
        if (o.a === 'BU') {
          action = 'B';
        } else if (o.a === 'SD') {
          action = 'S';
        }

        if (typeof action === 'undefined') {
          const error = new Error('Dữ liệu action bị sai');
          this.logger.error(error.message, error);

          throw error;
        }

        results.push([timestamp, o.v, o.ap, action]);
      });
    }

    const sortedResults = sortBy(results, (r: any) => r[0]).reverse();

    await prisma.stockInfoTicks.create({
      data: {
        symbol,
        date: dateObject,
        meta: sortedResults,
      },
    });

    this.logger.info(
      `OK migrated tick data symbol ${symbol} date ${dateString}`,
    );
  }

  private transformTime(date: Date, time: string) {
    if (typeof time !== 'string' || isEmpty(time)) {
      const error = new Error('om date không có dữ liệu time');
      this.logger.error(error.message, error);

      throw error;
    }
    const [hour, minute, second] = time.split(':');
    return moment
      .utc(date)
      .set({
        hours: Number(hour),
        minutes: Number(minute),
        seconds: Number(second),
      })
      .unix();
  }

  private async getOMData(
    code: string,
    date: string | Date,
    type: number,
    clientVersion: 'default' | 'v4' = 'default',
  ) {
    const db = this.oldMongoService.getDatabase(clientVersion);
    if (typeof date === 'string') {
      date = moment.utc(date).toDate();
    }
    return db.collection('ordermatchings').findOne({
      code,
      date,
      type,
    });
  }

  private async getHistoryRefer() {
    this.logger.info('Will get history reference');
    let histories = await this.stockPriceHelper.getHistory(
      'BFC',
      '2022-04-14',
      '2023-04-21',
    );

    if (Array.isArray(histories) && histories.length > 0) {
      histories = sortBy(histories, (item) => item.date);
      this.logger.info('Success got history reference');
    } else {
      throw new Error('Could not get history price');
    }

    return histories;
  }
}
