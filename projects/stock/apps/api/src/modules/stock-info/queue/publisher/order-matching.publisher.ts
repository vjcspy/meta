import { prisma } from '@modules/core/util/prisma';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';

/**
 * @deprecated
 * */
@Injectable()
export class OrderMatchingPublisher {
  private readonly logger = new Logger(OrderMatchingPublisher.name);

  constructor(private readonly connectionManager: AmqpConnectionManager) {}

  async publish() {
    const cors = await prisma.cor_entity.findMany();
    _.forEach(cors, (cor) => {
      this.connectionManager
        .getConnection()
        .publish(
          SyncValues.EXCHANGE_KEY,
          SyncValues.ORDER_MATCHING_KEY,
          cor.code,
          {},
        );
    });

    return {
      size: cors.length,
    };
  }

  async publishOne(code: string) {
    try {
      const cor = await prisma.cor_entity.findUnique({
        where: {
          code,
        },
      });
      if (cor?.id) {
        await this.connectionManager
          .getConnection()
          .publish(
            SyncValues.EXCHANGE_KEY,
            SyncValues.ORDER_MATCHING_KEY,
            cor.code,
            {},
          );
        this.logger.log(`Published sync OM code ${cor.code}`);
      }
    } catch (e) {
      this.logger.error(`Publish sync order matching for ${code}}`);
    }
  }
}
