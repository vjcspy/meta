import { prisma } from '@modules/core/util/prisma';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class SyncTicksPublisher {
  private readonly logger = new XLogger(SyncTicksPublisher.name);

  constructor(private readonly connectionManager: AmqpConnectionManager) {}

  async publish() {
    const cors = await prisma.cor_entity.findMany();
    _.forEach(cors, (cor) => {
      this.connectionManager
        .getConnection()
        .publish(
          SyncValues.SYNC_TICKS_EXCHANGE_KEY,
          SyncValues.SYNC_TICKS_ROUTING_KEY,
          cor.code,
          {},
        );
    });

    return {
      size: cors.length,
    };
  }
}
