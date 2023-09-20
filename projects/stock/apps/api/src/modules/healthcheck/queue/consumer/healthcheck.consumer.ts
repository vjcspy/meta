import { prisma } from '@modules/core/util/prisma';
import {
  HEALTH_CHECK_EXCHANGE_KEY,
  HEALTH_CHECK_ROUTING_KEY,
  HEALTH_CHECK_TIME_QUEUE_AND_DB,
} from '@modules/healthcheck/values/healthcheck.values';
import { XLogger } from '@nest/base';
import { RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckConsumer {
  private readonly logger = new XLogger(HealthcheckConsumer.name);

  @RabbitSubscribe({
    exchange: HEALTH_CHECK_EXCHANGE_KEY,
    routingKey: HEALTH_CHECK_ROUTING_KEY,
    queue: `${HEALTH_CHECK_ROUTING_KEY}_QUEUE`,
    queueOptions: {
      durable: true,
    },
  })
  public async handler(value: string) {
    const key = HEALTH_CHECK_TIME_QUEUE_AND_DB;
    value = value.toString();
    await prisma.flag.upsert({
      where: { key },
      create: { key, value },
      update: { value },
    });
  }
}
