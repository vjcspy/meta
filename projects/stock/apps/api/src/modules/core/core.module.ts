import { HELPERS } from '@modules/core/helper';
import { MODELS } from '@modules/core/model';
import { CORE_REPO } from '@modules/core/repo';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [...MODELS, ...HELPERS, ...CORE_REPO],
  exports: [HttpModule, ...MODELS, ...HELPERS, ...CORE_REPO],
})
export class CoreModule {}
