import { BaseModule } from '@nest/base';
import { RabbitMQModule } from '@nest/rabbitmq';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestHandler } from './model/rabbitmq/TestHandle';

@Module({
  imports: [
    BaseModule,
    RabbitMQModule.register({
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
      //Nếu không khai báo name thì mặc định là đang config cho default connection
      exchanges: [
        {
          name: 'testbed-exchange1',
          type: 'topic',
        },
      ],
      // Default channel sẽ luôn được tạo và sử dụng name của connection trừ trường hợp tự khai báo 1 default channel
      channels: {
        'channel-1': {
          prefetchCount: 1,
          default: true,
        },
        'channel-2': {
          prefetchCount: 2,
        },
      },
      // Muốn handler nào được chạy thì cần phải khai báo
      handlers: [TestHandler],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): any {
    // TODO
  }
}
