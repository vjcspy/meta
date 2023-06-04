import { StockInfoModule } from '@modules/stock-info/stock-info.module';
import { BaseModule } from '@nest/base';
import { RabbitMQModule } from '@nest/rabbitmq';
import { HttpModule } from '@nestjs/axios';
import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //If a variable is found in multiple files, the first one takes precedence.
      envFilePath: [
        '.env.development.local',
        '.env.local',
        '.env.development',
        '.env.production',
        '.env',
      ],
    }),
    HttpModule, //https://docs.nestjs.com/techniques/http-module
    BaseModule,
    RabbitMQModule.register({
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
      //Nếu không khai báo name thì mặc định là đang config cho default connection
      // name:'default',
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
      // Muốn handler nào được chạy thì cần phải khai báo, nếu khai báo handler ở đây thì không cần redeclare ở provider nữa
      handlers: [],
    }),
    StockInfoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): any {
    // TODO
  }
}
