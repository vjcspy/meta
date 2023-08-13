import { prisma } from '@modules/core/util/prisma';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { AmqpConnectionManager } from '@nest/rabbitmq/dist/model/amqp/connection-manager';
import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class StockPricePublisher {
  private readonly logger = new Logger(StockPricePublisher.name);

  constructor(private readonly connectionManager: AmqpConnectionManager) {}

  async publish() {
    const cors = await prisma.cor_entity.findMany();
    _.forEach(cors, (cor) => {
      this.connectionManager
        .getConnection()
        .publish(
          SyncValues.EXCHANGE_KEY,
          SyncValues.STOCK_PRICE_SYNC_KEY,
          cor.code,
          {}
        );
    });

    return {
      size: cors.length,
    };
  }
}
