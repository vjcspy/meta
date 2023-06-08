import { HELPERS } from '@modules/core/helper';
import { MODELS } from '@modules/core/model';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [...MODELS, ...HELPERS],
  exports: [HttpModule, ...MODELS, ...HELPERS],
})
export class CoreModule {}
