import { CoreModule } from '@modules/core/core.module';
import { StockInfoModule } from '@modules/stock-info/stock-info.module';
import { BaseModule } from '@nest/base';
import { RabbitMQModule } from '@nest/rabbitmq';
import type { OnModuleInit } from '@nestjs/common';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import * as process from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //If a variable is found in multiple files, the first one takes precedence.
      envFilePath: [
        // `${process.cwd()}/.env.production`,
        // `${process.cwd()}/.env`,
        '.env.development.local',
        '.env.local',
        '.env.development',
        '.env.production',
        '.env.default', // Khong su dung duoc .env vi trong code cua nest luc nao cung uu tien file nay
      ],
    }),
    ScheduleModule.forRoot(),
    CoreModule, //https://docs.nestjs.com/techniques/http-module
    BaseModule,
    RabbitMQModule.register({
      uri: `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
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
  private readonly logger = new Logger(AppModule.name);
  constructor(private readonly configService: ConfigService) {}
  onModuleInit(): any {
    // this.logger.log(`Rabbit port ${this.configService.get('RABBITMQ_PORT')}`);
  }
}
