import { prisma } from '@modules/core/util/prisma';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class StockPricePublisher {
  private readonly logger = new Logger(StockPricePublisher.name);

  constructor(private readonly connectionManager: AmqpConnectionManager) {}

  async publish(exchange: string[] = [], fromBeginning: boolean = false) {
    const cors = await prisma.cor_entity.findMany();
    let size = 0;
    _.forEach(cors, (cor) => {
      if (Array.isArray(exchange) && exchange.length > 0) {
        if (!_.includes(exchange, cor.exchange)) {
          return true;
        }
      }

      this.connectionManager.getConnection().publish(
        SyncValues.EXCHANGE_KEY,
        SyncValues.STOCK_PRICE_SYNC_KEY,
        {
          code: cor.code,
          fromBeginning,
        },
        {},
      );
      size += 1;
    });

    return {
      size,
    };
  }
}
