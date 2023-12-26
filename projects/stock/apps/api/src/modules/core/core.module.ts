import { AppExceptionFilter } from '@modules/core/exception-filter/AppExceptionFilter';
import { HELPERS } from '@modules/core/helper';
import { AppResponseInterceptor } from '@modules/core/intercepter/app-response.interceptor';
import { MODELS } from '@modules/core/model';
import { CORE_REPO } from '@modules/core/repo';
import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Global()
@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AppResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
    ...MODELS,
    ...HELPERS,
    ...CORE_REPO,
  ],
  exports: [HttpModule, ...MODELS, ...HELPERS, ...CORE_REPO],
})
export class CoreModule {}
