import { ConsumeMessage, RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TestHandler {
  @RabbitSubscribe({
    connection: 'default',
    exchange: 'testbed-exchange1',
    routingKey: 'subscribe-route',
    queue: 'subscribe-queue',
  })
  public async pubSubHandler(msg: any, amqpMsg: ConsumeMessage) {
    console.log(`Correlation id: ${amqpMsg.properties.correlationId}`);
  }
}
