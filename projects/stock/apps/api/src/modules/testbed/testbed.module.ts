import { TedbedController } from '@modules/testbed/controller/tedbed.controller';
import { EVENT_RX } from '@modules/testbed/event-rx';
import { TestbedConsumer } from '@modules/testbed/queue/consumer/testbed.consumer';
import { TestbedService } from '@modules/testbed/service/testbed.service';
import { TESTBED_EXCHANGE_KEY } from '@modules/testbed/values/tedbed.value';
import { RabbitMQModule } from '@nest/rabbitmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RabbitMQModule.register({
      exchanges: [
        {
          name: TESTBED_EXCHANGE_KEY,
          type: 'topic',
        },
      ],
      handlers: [TestbedConsumer],
    }),
  ],
  providers: [...EVENT_RX, TestbedService],
  controllers: [TedbedController],
})
export class TestbedModule {}
