import { CoreModule } from '@modules/core/core.module';
import { SlackHelper } from '@modules/core/helper/slack.helper';
import { isCronEnable } from '@modules/core/util/isCronEnable';
import { HealthcheckModule } from '@modules/healthcheck/healthcheck.module';
import { StockModule } from '@modules/stock/stock.module';
import { StockInfoModule } from '@modules/stock-info/stock-info.module';
import { StockTradingModule } from '@modules/stock-trading/stock-trading.module';
import { TCBSModule } from '@modules/tbcs/tcbs.module';
import { TestbedModule } from '@modules/testbed/testbed.module';
import { BaseModule, getNodeEnv, isProduction, XLogger } from '@nest/base';
import { RabbitMQModule } from '@nest/rabbitmq';
import type {
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaClient } from '@prisma/client';
import * as https from 'https';
import * as process from 'process';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      // If a variable is found in multiple files, the first one takes precedence.
      envFilePath: [
        // `${process.cwd()}/.env.production`,
        // `${process.cwd()}/.env`,
        `.env.${getNodeEnv()}.local`,
        '.env.local',
        `.env.${getNodeEnv()}`,
        '.env.default', // Khong su dung duoc .env vi trong code cua nest luc nao cung uu tien file nay
      ],
    }),
    BaseModule,
    ...(isCronEnable() ? [ScheduleModule.forRoot()] : []),
    RabbitMQModule.register({
      uri: `amqp://${process.env.RABBITMQ_USERNAME}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`,
      // Nếu không khai báo name thì mặc định là đang config cho default connection
      // name:'default',
      exchanges: [],
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
    HealthcheckModule,
    StockModule,
    StockInfoModule,
    StockTradingModule,
    TestbedModule,
    TCBSModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule
  extends PrismaClient
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    OnApplicationShutdown
{
  private readonly logger = new XLogger(AppModule.name);

  constructor(
    private readonly configService: ConfigService,
    private slackHelper: SlackHelper,
  ) {
    super();
  }

  async onModuleInit() {
    if (isCronEnable()) {
      this.logger.log('Cron is enabled');
    } else {
      this.logger.log('Cron is disabled');
    }

    try {
      await this.$connect();
      this.logger.log('Successfully connected to PostgresDB');
    } catch (e) {
      this.logger.error('Could not connect to PostgresDB', e);
      // Gửi thông báo lỗi qua Slack nếu đang ở production
      if (isProduction()) {
        this.slackHelper.postMessage(SlackHelper.DEFAULT_CHANNEL_NAME, {
          text: `❌ Database connection failed: ${e.message}`,
        });
      }
      throw e;
    }
  }

  onApplicationBootstrap(): any {
    if (isProduction()) {
      https.globalAgent.options.rejectUnauthorized = false;
      this.slackHelper.postMessage(SlackHelper.DEFAULT_CHANNEL_NAME, {
        text: `Successfully bootstrap`,
      });
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database connection closed');
  }

  async onApplicationShutdown(signal?: string) {
    this.logger.log(`Application shutdown (signal: ${signal})`);
    await this.$disconnect();
  }
}
