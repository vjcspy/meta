import { initLoggerInstance } from '@nest/base/dist/util/logger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: initLoggerInstance({
      file: process.env.LOG_FILE === 'true',
      splunk: {
        enable: process.env.SPLUNK_ENABLE,
        token: process.env.SPLUNK_TOKEN,
        url: process.env.SPLUNK_URL,
        index: process.env.SPLUNK_INDEX,
        source: process.env.SPLUNK_SOURCE,
      },
    }),
  });
  await app.listen(3000);
}
bootstrap();
