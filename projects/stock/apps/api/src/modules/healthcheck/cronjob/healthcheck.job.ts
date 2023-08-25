import { FlagRepo } from '@modules/core/repo/flag.repo';
import {
  HEALTH_CHECK_EXCHANGE_KEY,
  HEALTH_CHECK_ROUTING_KEY,
  HEALTH_CHECK_TIME_DB,
} from '@modules/healthcheck/values/healthcheck.values';
import { isMainProcess, XLogger } from '@nest/base/dist';
import { AmqpConnectionManager } from '@nest/rabbitmq/dist/model/amqp/connection-manager';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class HealthcheckJob {
  private readonly logger = new XLogger('HealthcheckJob');

  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly flagRepo: FlagRepo,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  handleCron() {
    if (isMainProcess()) {
      this.connectionManager
        .getConnection()
        .publish(
          HEALTH_CHECK_EXCHANGE_KEY,
          HEALTH_CHECK_ROUTING_KEY,
          Date.now(),
          {},
        );
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  updateDB() {
    if (isMainProcess()) {
      // this.logger.info('health check db');
      this.flagRepo.update(HEALTH_CHECK_TIME_DB, Date.now().toString());
    }
  }
}
