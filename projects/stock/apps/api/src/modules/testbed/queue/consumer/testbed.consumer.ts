import {
  TESTBED_EXCHANGE_KEY,
  TESTBED_ROUTING_KEY,
} from '@modules/testbed/values/tedbed.value';
import { XLogger } from '@nest/base';
import { RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestbedConsumer {
  private readonly logger = new XLogger(TestbedConsumer.name);

  @RabbitSubscribe({
    exchange: TESTBED_EXCHANGE_KEY,
    routingKey: TESTBED_ROUTING_KEY,
    queue: `testbed.queue`,
    queueOptions: {
      durable: true,
    },
  })
  handler(msg: string) {
    this.logger.info(`received message ${msg}`);
  }
}
