import { TCBS_HELPERS } from '@modules/tbcs/helper';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [...TCBS_HELPERS],
  exports: [...TCBS_HELPERS],
})
export class TCBSModule {}
