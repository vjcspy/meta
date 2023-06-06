import { MODELS } from '@modules/core/model';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [...MODELS],
  exports: [HttpModule, ...MODELS],
})
export class CoreModule {}
