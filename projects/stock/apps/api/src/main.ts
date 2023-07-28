import { getAppName, getInstanceId } from '@nest/base';
import { initLoggerInstance } from '@nest/base/dist/util/logger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = initLoggerInstance({
    file: process.env.LOG_FILE === 'true',
    splunk: {
      enable: process.env.SPLUNK_ENABLE,
      token: process.env.SPLUNK_TOKEN,
      url: process.env.SPLUNK_URL,
      index: process.env.SPLUNK_INDEX,
      source: `${getAppName()}|${getInstanceId()}`,
    },
  });
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  const configService = app.get(ConfigService);
  const port = configService.get('APP_PORT') || 3000;
  await app.listen(port);
  logger.log(`Listening on port ${port}`, 'NestApplication');
}
bootstrap();
