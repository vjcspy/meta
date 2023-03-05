import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [DiscoveryModule],
  exports: [DiscoveryModule],
})
export class BaseModule {}
