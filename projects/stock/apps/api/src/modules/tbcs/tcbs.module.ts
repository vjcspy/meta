import { CoreModule } from '@modules/core/core.module';
import { TCBS_HELPERS } from '@modules/tbcs/helper';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreModule],
  providers: [...TCBS_HELPERS],
  exports: [...TCBS_HELPERS],
})
export class TCBSModule {}
